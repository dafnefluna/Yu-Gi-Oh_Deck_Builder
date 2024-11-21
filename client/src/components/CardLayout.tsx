import React from 'react';
import Auth from '../utils/auth';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Cards } from '../interfaces/Card'

interface CardListProps {
    cards: Cards[];
    savedCardIds: string[];
    handleSaveCard: (cardId: string) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, savedCardIds, handleSaveCard }) => (
    <Row>
        {cards.map((card) => {
            return (
                <Col md="4" key={card.name}>
                    <Card border='dark'>
                        {card.image ? (
                            <Card.Img src={card.image} alt={`Art for ${card.name}`} variant='top' />
                        ) : null}
                        <Card.Body>
                            <Card.Text>{card.name}</Card.Text>
                            <Card.Text>ATR: {card.attribute} | Level: {card.level}</Card.Text>
                            <Card.Text>[{card.race} / {card.type}]</Card.Text>
                            <Card.Text>{card.description}</Card.Text>
                            <Card.Text>ATK: {card.atk} | DEF: {card.def}</Card.Text>
                            {Auth.loggedIn() && (
                                <Button
                                    disabled={savedCardIds?.some((savedCardId: string) => savedCardId === card.name)}
                                    className='btn-block btn-info'
                                    onClick={() => handleSaveCard(card.name)}>
                                    {savedCardIds?.some((savedCardId: string) => savedCardId === card.name)
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
);

export default CardList;