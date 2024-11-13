import { FormEvent, useEffect, useState } from 'react';

import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
} from 'react-bootstrap';

import type { Cards } from '../interfaces/Card'
import { searchYuGiOhCard } from '../utils/mutations';
import type { YuGiOhCard } from '../interfaces/YuGiOhAPISearch';
import Auth from '../utils/auth';
import { saveCardIds, getSavedCardIds } from '../utils/localStorage';


const LandingPage = () => {
    const [searchedCards, setSearchedCards] = useState<Cards[]>([]);
    const [searchInput, setSearchInput] = useState('')
    const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());


    useEffect(() => {
        return () => saveCardIds(savedCardIds);
    })

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchYuGiOhCard(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { data } = await response.json();
            console.log(data);

            const cardData = data.map((card: YuGiOhCard) => ({
                cardId: card.id,
                name: card.name,
                type: card.type,
                description: card.desc,
                image: card.card_images[0].image_url,
            }));
            console.log(cardData);

            setSearchedCards(cardData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveCard = async (cardId: string) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {

            setSavedCardIds([cardId]);
        } catch (error) {
            console.error('Error saving card: ', error);
        }
    };

    return (
        <>
            <div className='text-light bg-dark p-5'>
                <Container>
                    <h1>Yu-Gi-Oh Deck Builder</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Enter Card Name'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>Submit Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>

            <Container>
                <h2 className='pt-5'>
                    {searchedCards.length
                        ? `Viewing ${searchedCards.length} results:`
                        : 'Search for a card to begin'}
                </h2>
                <Row>
                    {searchedCards.map((card) => {
                        return (
                            <Col md="4" key={card.id}>
                                <Card border='dark'>
                                    {card.image ? (
                                        <Card.Img src={card.image} alt={`Art for ${card.name}`} variant='top' />
                                    ) : null}
                                    <Card.Body>
                                        <Card.Text>{card.name}</Card.Text>
                                        <Card.Text>{card.description}</Card.Text>
                                        {Auth.loggedIn() && (
                                            <Button
                                                disabled={savedCardIds?.some((savedCardId: string) => savedCardId === card.id)}
                                                className='btn-block btn-info'
                                                onClick={() => handleSaveCard(card.id)}>
                                                {savedCardIds?.some((savedCardId: string) => savedCardId === card.id)
                                                    ? 'This card has already been saved!'
                                                    : 'Save this Card!'}
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default LandingPage;