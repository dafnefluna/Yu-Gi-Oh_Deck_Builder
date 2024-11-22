const DeckPage = () => {
    return (
        <>
        </>
    )
}

export default DeckPage;

import Accordion from 'react-bootstrap/Accordion';
import { Col, Card } from 'react-bootstrap';
import { Decks } from '../interfaces/Deck.js'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GETALLDECKS } from '../utils/queries.js';
import CardtoDeck from '../components/CardToDeck.js';



const CardCollectionPage: React.FC = () => {

    // establisha  state for the card data
    const [decks, setDecks] = useState<Decks[] | null>([]);
    // establish the usequery for get all cards

// do i need variables if im getting all cards should it just be an open  object
    const { data: deckDataQuery, loading: deckLoading, error: deckError } = useQuery(QUERY_GETALLDECKS);
    
        useEffect(() => {
            if (deckDataQuery && deckDataQuery.Decks) {
                setDecks(deckDataQuery.getAllDecks);
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
                            <Card.Img src={card.image} alt={`Art for ${card.name}`} variant='top' />
                        ) : null}
                </Accordion.Header>
                <Accordion.Body>
                    <Card border='dark'>
                    <Card.Body>
                            <Card.Text>{card.name}</Card.Text>
                            <Card.Text>ATR: {card.attribute} | Level: {card.level}</Card.Text>
                            <Card.Text>[{card.race} / {card.type}]</Card.Text>
                            <Card.Text>{card.description}</Card.Text>
                            <Card.Text>ATK: {card.atk} | DEF: {card.def}</Card.Text>
                            <CardtoDeck card={card} />
                    </Card.Body>
                    </Card>

                </Accordion.Body>
            </Accordion.Item>
                ))}
        </Accordion>
        </Col>
    );
};


export default CardCollectionPage;