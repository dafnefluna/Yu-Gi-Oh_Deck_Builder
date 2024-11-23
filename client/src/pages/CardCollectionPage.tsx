import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import { Button } from "antd";
import { Link } from "react-router-dom";
import { QUERY_GETALLCARDS } from '../utils/queries.js';
import CardtoDeck from '../components/CardToDeck.js';
import Auth from "../utils/auth";
import { Cards } from '../interfaces/Card.js';

const CardCollectionPage: React.FC = () => {
    const [cards, setCards] = useState<Cards[] | null>(null);
    
    const username = Auth.getUsername();
    console.log('Username:', username);  // To debug if the username is being fetched correctly

    const { data: cardDataQuery, loading: cardLoading, error: cardError, refetch } = useQuery(QUERY_GETALLCARDS, {
        variables: { username },
        // Don't skip or use other conditions here, we need it to always run when the component is mounted
    });

    // Optional: Use the refetch method manually if you need to programmatically refresh data
    useEffect(() => {
        if (cardDataQuery) {
            setCards(cardDataQuery.user.savedCards);
        }
    }, [cardDataQuery]);

    // Fetch cards when the component is mounted or username changes
    useEffect(() => {
        if (username) {
            refetch();  // Refetch the query if the username changes
        }
    }, [username, refetch]);

    const splitIntoGroups = (arr: Cards[], groups: number) => {
        const groupSize = Math.ceil(arr.length / groups);
        return Array.from({ length: groups }, (_, i) => arr.slice(i * groupSize, (i + 1) * groupSize));
    };

    const groups = cards ? splitIntoGroups(cards, 3) : [];

    const isLoggedIn = Auth.loggedIn();

    if (!isLoggedIn) {
        return (
            <div className="containerPage">
                <Card
                    style={{
                        width: 400,
                        textAlign: "center",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#f0f2f5",
                    }}
                >
                    <h2 style={{ color: "yellow", background: "black", borderRadius: "10px" }}>
                        Whoah! You've gone BANANAS! Please log in before viewing saved cards 🍌
                    </h2>
                    <iframe
                        src="https://giphy.com/embed/H8uuXYln5pxVVLFn7k"
                        height="270"
                        frameBorder="0"
                        allowFullScreen
                        title="Bananas GIF"
                        style={{ marginBottom: "16px", width: "100%" }}
                    ></iframe>
                    <Link to="/">
                        <Button type="primary">Go to Login Page</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (cardLoading) return <p>Loading...</p>;
    if (cardError) return <p>Error loading card data: {cardError.message}</p>;

    const CardAccordion: React.FC<{ cards: Cards[] }> = ({ cards }) => (
        <Accordion>
            {cards.map((card, index) => (
                <Accordion.Item eventKey={index.toString()} key={card.id}>
                    <Accordion.Header>
                        {card.image && <Card.Img src={card.image} alt={`Art for ${card.name}`} variant="top" />}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Text>{card.name}</Card.Text>
                                <Card.Text>ATR: {card.attribute} | Level: {card.level}</Card.Text>
                                <Card.Text>[{card.race} / {card.type}]</Card.Text>
                                <Card.Text>{card.description}</Card.Text>
                                <Card.Text>ATK: {card.attack} | DEF: {card.defense}</Card.Text>
                                <CardtoDeck card={card} />
                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );

    return (
        <>
            <div className="backgroundStyle"></div>
            <Container className="text-center my-4">
                <h2>My Yu-Gi-Oh Collection</h2>
                <Row>
                    {groups.map((group, index) => (
                        <Col xs={12} md={4} key={index}>
                            <CardAccordion cards={group} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default CardCollectionPage;
