import Accordion from 'react-bootstrap/Accordion';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { Cards } from '../interfaces/Card.js'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GETALLCARDS } from '../utils/queries.js';
import CardtoDeck from '../components/CardToDeck.js';


const CardCollectionPage: React.FC = () => {

    // establisha  state for the card data
    const [cards, setCards] = useState<Cards[] | null>([]);
    const { data: cardDataQuery, loading: cardLoading, error: cardError } = useQuery(QUERY_GETALLCARDS);

    useEffect(() => {
        if (cardDataQuery) {
            console.log(cardDataQuery);
            setCards(cardDataQuery.allCards);

        }
    }, [cardDataQuery]);

    if (cardLoading) return <p>Loading...</p>;
    if (cardError) return <p>Error loading card data: {cardError.message}</p>;

    const splitIntoThreeGroups = (arr: Cards[]) => {
        const groupSize = Math.ceil(arr.length / 3);
        return [arr.slice(0, groupSize), arr.slice(groupSize, groupSize * 2), arr.slice(groupSize * 2)];
    };

    const [group1, group2, group3] = splitIntoThreeGroups(cards || []);

    return (
        <>
            <div className='backgroundStyle'></div>
            <Container className="text-center my-4">
            <h2>My Yu-Gi-Oh Collection</h2>
                <Row>
                <Col xs={12} md={4} class='accordion'>
                    <Accordion >
                        {group1.map((card, index) => (
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
                                            <Card.Text>ATK: {card.attack} | DEF: {card.defense}</Card.Text>
                                            <><CardtoDeck card={card} /></>
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
                <Col xs={12} md={4} >
                    <Accordion>
                        {group2.map((card, index) => (
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
                                            <Card.Text>ATK: {card.attack} | DEF: {card.defense}</Card.Text>
                                            <><CardtoDeck card={card} /></>
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
                <Col xs={12} md={4}>
                    <Accordion>
                        {group3.map((card, index) => (
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
                                            <Card.Text>ATK: {card.attack} | DEF: {card.defense}</Card.Text>
                                            <><CardtoDeck card={card} /></>
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>
            </Container>

        </>
    );
};


export default CardCollectionPage;