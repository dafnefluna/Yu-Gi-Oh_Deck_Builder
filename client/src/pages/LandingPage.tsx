import { FormEvent, useState } from 'react';

import {
    Container,
    Col,
    Form,
    Button,
    // Card,
    Row
} from 'react-bootstrap';

import { searchYuGiOhCard } from '../utils/API';
// import type { YuGiOhCard } from '../models/YuGiOhAPISearch';
// import Auth from '../utils/auth';

const LandingPage = () => {
    // const [searchedCards, setSearchedCards] = useState<Card[]>([]);
    const [searchInput, setSearchInput] = useState('')

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

            // const { items } = await response.json();

            // const cardData = items.map((card: YuGiOhCard) => ({
            //     cardId: card.id,
            //     name: card.cardInfo.name,
            //     type: card.cardInfo.type,
            //     description: card.cardInfo.description,
            //     image: card.cardInfo.image?.thumbnail || '',
            // }));

            // setSearchedCards(cardData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
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
                {/* <h2 className='pt-5'>
                    {searchedCards.length
                        ? `Viewing ${searchedCards.length} results:`
                        : 'Search for a card to begin'}
                </h2> */}
                {/* <Row>
                    {searchedCards.map((card) => {
                        return (
                            <Col md="4" key={card.cardId}>
                                <Card border='dark'>
                                    {card.image ? (
                                        <Card.Img src={card.image} alt={`Art for ${card.name}`} variant='top' />
                                    ) : null}
                                    <Card.Body>
                                        <Card.Title>{card.name}</Card.Title>
                                        <Card.Text>{card.description}</Card.Text>
                                        {Auth.loggedIn() && (
                                            // <Button
                                            //     disabled={savedCardIds?.some((savedCardkId: string) => savedBookId === card.cardId)}
                                            //     className='btn-block btn-info'
                                            //     onClick={() => handleSaveCard(card.cardId)}>
                                            //     {savedCardIds?.some((savedCardId: string) => savedCardId === card.cardId)
                                            //         ? 'This book has already been saved!'
                                            //         : 'Save this Book!'}
                                            // </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row> */}
            </Container>
        </>
    );
};

export default LandingPage;