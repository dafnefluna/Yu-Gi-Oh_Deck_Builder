import { FormEvent, useState } from 'react';
// import fs from 'fs';
// import path from 'path';

import {
    Container,
    Col,
    Form,
    Button,
    Row
} from 'react-bootstrap';

import { Pagination } from 'antd';
import type { Cards } from '../interfaces/Card'
import { searchYuGiOhCard } from '../utils/mutations';
import type { YuGiOhCard } from '../interfaces/YuGiOhAPISearch';
// import Auth from '../utils/auth';
// import { saveCardIds, getSavedCardIds } from '../utils/localStorage';
import CardList from '../components/CardLayout';

const SearchPage = () => {
    const [searchedCards, setSearchedCards] = useState<Cards[]>([]);

    const [searchInput, setSearchInput] = useState('')
    const [dropInput, setDropInput] = useState('fname');
    // const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState('');
    const [currentCardsPer, setCardsPer] = useState(6);

    // useEffect(() => {
    //     return () => saveCardIds(savedCardIds);
    // })

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchYuGiOhCard(dropInput, searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { data } = await response.json();
            // console.log(data);

            const cardData = data.map((card: YuGiOhCard) => ({
                cardId: card.id,
                image: card.card_images[0].image_url,
                name: card.name,
                attribute: card.attribute,
                level: card.level,
                race: card.race,
                type: card.type,
                archetype: card.archetype,
                description: card.desc,
                attack: card.atk,
                defense: card.def,
            }));
            // console.log(cardData);

            // for (const card of cardData) {
            //     if (card.image) {
            //         const filename = `${card.cardId}.jpg`;

            //         await downloadCardImage(card.image, filename);
            //     }
            // }

            setSearchedCards(cardData);
            setSearchInput('');
            setCurrentPage(1);
            setError('');
        } catch (err) {
            console.error(err);
            setError('An occurred while searching. Make sure you have input the card data correctly.');
        }
    };


    /*Pagination variables*/
    const lastIndex = currentPage * currentCardsPer;
    const firstIndex = lastIndex - currentCardsPer;

    const currentCards = searchedCards.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(searchedCards.length / currentCardsPer);

    const onPageChange = (page: number, size: number) => {
        setCurrentPage(page);
        setCardsPer(size);
    }
    //



    // const downloadCardImage = async (url: string, filename: string) => {
    //     try {
    //         const response = await fetch(url);

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch image url');
    //         }

    //         const data = await response.json();

    //         const outPath = path.join(__dirname, 'images', filename);

    //         fs.writeFileSync(outPath, data);

    //         return outPath;

    //     } catch(error) {
    //         console.error('Error downloading image: ', error);
    //     }
    // }

    // const handleSaveCard = async (cardId: string) => {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {

    //         setSavedCardIds([cardId]);
    //     } catch (error) {
    //         console.error('Error saving card: ', error);
    //     }
    // };

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
                                    placeholder='Enter Keyword'
                                />
                                <Form.Control
                                    as='select'
                                    value={dropInput}
                                    onChange={(e) => setDropInput(e.target.value)}
                                >
                                    <option value='fname'>Search by Card Name (e.g. Dark Magician, Baby Dragon, Time Wizard)</option>
                                    <option value='type'>Search by Type (e.g. Normal Monster, Effect Monster, Synchro Monster, Spell Card)</option>
                                    <option value='race'>Search by Race (e.g. Spellcaster, Warrior, Insect)</option>
                                    <option value='attribute'>Search by Attribute (e.g. Dark, Divine, Fire, Light, Earth)</option>
                                    <option value='level'>Search by Card Level (e.g. 0 - 12)</option>
                                    <option value='archetype'>Search by Card Archetype (e.g. Artifact, Bujin, Doodle Beast)</option>
                                </Form.Control>
                                {error && <p style={{ color: 'red' }}>{error}</p>}

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
                
                <CardList cards = {currentCards}/>

                <div className ='d-flex justify-content-center mt-4 mb-4 pagination-container'>
                    <Pagination
                        hideOnSinglePage = 'true'
                        pageSize={currentCardsPer}
                        total = {searchedCards.length}
                        current={currentPage}
                        totalPages={totalPages}
                        showSizeChanger={true}
                        pageSizeOptions={['6', '12', '18', '24']}
                        onChange={onPageChange}
                        size='large'
                    />
                </div>
            </Container>
        </>
    );
}

export default SearchPage;