import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Cards } from '../interfaces/Card.js';
import { ADD_CARD_TO_DECK} from '../utils/mutations.js';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GETSINGLECARD } from '../utils/queries.js';


// this component is the functionality to be able to save a card from the user collection to a deck.
// use <CardToDeck cardId={card.id}></CardToDeck> when I put this in another page or whatever and import

// 
const CardtoDeck: React.FC<{cardId: string}> = ({ cardId }) => {
    // establish state for the card data
    const [cardData, setCardData] = useState<Cards | null>(null);
    // const [deckData, setDeckData] = useState<
    // do the above for deckdata and create an interface

    // establish useQuery for card with id
    const { data, loading, error } = useQuery(QUERY_GETSINGLECARD, { 
        variables: { id: cardId}, 
    });

    // establish usemutation to get the addcardtodeck mutation
    const [addCardToDeckMutation] = useMutation(ADD_CARD_TO_DECK);
    // query to getAllDecks
    // mutation to Save new card
    // mutatiion to create new deck

    useEffect(() => {
        if (data && data.card) {
            setCardData(data.card);
        }
    }, [data]);

    // function to add card to deck. aync bc wait f
    const addCardToDeck = async () => {
        if (cardData) {
            try {
                await addCardToDeckMutation({
                    variables: {
                        id: cardData.id,
                    },
                });
                console.log('Card added to deck successfully');
            } catch (err) {
                console.error('Error adding card to deck:', err);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading card data: {error.message}</p>;

    return (
    <div>
        <h1>{cardData?.name}</h1>
    <ButtonGroup>
        <DropdownButton as={ButtonGroup} title="Save Card" id="bg-nested-dropdown" onClick={addCardToDeck}>
            <Dropdown.Item eventKey="1">... To My Collection</Dropdown.Item>
            <Dropdown.Item eventKey="2">... To New Deck</Dropdown.Item>
            <Dropdown.Item eventKey="3">... To Existing Deck</Dropdown.Item>
        </DropdownButton>
    </ButtonGroup>
    </div>
    )
};

export default CardtoDeck;

