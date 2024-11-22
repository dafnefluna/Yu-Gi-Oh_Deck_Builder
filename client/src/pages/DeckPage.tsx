import Accordion from 'react-bootstrap/Accordion';
import { Col, Card } from 'react-bootstrap';
import { Decks } from '../interfaces/Deck.js'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GETALLDECKS } from '../utils/queries.js';
// import CardtoDeck from '../components/CardToDeck.js';



const DeckPage: React.FC = () => {

    // establisha  state for the card data
    const [decks, setDecks] = useState<Decks[] | null>([]);
    // establish the usequery for get all cards

// do i need variables if im getting all cards should it just be an open  object
    const { data: deckDataQuery, loading: deckLoading, error: deckError } = useQuery(QUERY_GETALLDECKS);
    
        useEffect(() => {
            if (deckDataQuery) {
                console.timeLog(deckDataQuery)
                setDecks(deckDataQuery.allDecks);
            }
        }, [deckDataQuery]);

        if (deckLoading ) return <p>Loading...</p>;
        if (deckError) return <p>Error loading deck data: {deckError.message}</p>;



    return (
        <Col md="4" border='dark'>
        <Accordion >
            {decks?.map((deck, index) =>(
            <Accordion.Item eventKey={index.toString()} key={deck.id}>
                <Accordion.Header>
                {deck.cards[0].image ? (
                            <Card.Img src={deck.cards[0].image} alt={`Art for ${deck.cards[0].name}`} variant='top' />
                        ) : null}
                </Accordion.Header>
                <Accordion.Body>
                    <Card border='dark'>
                    <Card.Body>
                            <Card.Text>{deck.name}</Card.Text>
                            <Card.Text>Playable?: {deck.playable}</Card.Text>
                            <Card.Text>Type: {deck.type}</Card.Text>
                            <Card.Text>Saved Cards</Card.Text>
                    </Card.Body>
                    </Card>

                </Accordion.Body>
            </Accordion.Item>
                ))}
        </Accordion>
        </Col>
    );
};


export default DeckPage;