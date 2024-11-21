import Accordion from 'react-bootstrap/Accordion';
import { Col, Card } from 'react-bootstrap';
import { Cards } from '../interfaces/Card.js'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GETALLCARDS } from '../utils/queries.js';
import CardtoDeck from '../components/CardToDeck.js';



const CardCollectionPage: React.FC = () => {

    // establisha  state for the card data
    const [cards, setCards] = useState<Cards[] | null>([]);
    // establish the usequery for get all cards

// do i need variables if im getting all cards should it just be an open  object
    const { data: cardDataQuery, loading: cardLoading, error: cardError } = useQuery(QUERY_GETALLCARDS);
    
        useEffect(() => {
            if (cardDataQuery && cardDataQuery.Cards) {
                setCards(cardDataQuery.Cards);
            }
        }, [cardDataQuery]);

        if (cardLoading ) return <p>Loading...</p>;
        if (cardError) return <p>Error loading card data: {cardError.message}</p>;



    return (
        <Col md="4" border='dark'>
        <Accordion >
            {cards?.map((card, index) =>(
            <Accordion.Item eventKey={index.toString()} key={card.id}>
                <Accordion.Header>
                {card.image ? (
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