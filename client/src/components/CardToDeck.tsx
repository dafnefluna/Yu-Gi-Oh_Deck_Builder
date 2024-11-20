import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Cards } from '../interfaces/Card.js';
import { Decks } from '../interfaces/Deck.js';
import { ADD_CARD_TO_DECK, CREATE_NEW_DECK, SAVE_NEW_CARD } from '../utils/mutations.js';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GETALLDECKS, QUERY_GETSINGLECARD } from '../utils/queries.js';


// this component is the functionality to be able to save a card from the user collection to a deck.
// use <CardToDeck cardId={card.id, deck.id}></CardToDeck> when I put this in another page or whatever and import

// 
const CardtoDeck: React.FC<{ cardId: string, deckId: string }> = ({ cardId, deckId }) => {
    // establish state for the card data
    const [cardData, setCardData] = useState<Cards | null>(null);
    const [deckData, setDeckData] = useState<Decks | null>(null);
    // do the above for deckdata and create an interface

    // establish useQuery for card with id
    const { data: cardDataQuery, loading: cardLoading, error: cardError } = useQuery(QUERY_GETSINGLECARD, {
        variables: { id: cardId },
    });

    const { data: deckDataQuery, loading: deckLoading, error: deckError } = useQuery(QUERY_GETALLDECKS, {
        variables: { id: deckId }
    })
    // establish usemutation to get the addcardtodeck mutation
    const [addCardToDeckMutation] = useMutation(ADD_CARD_TO_DECK);
    const [addCardtoUserMutation] = useMutation(SAVE_NEW_CARD);
    const [createNewDeckMutation] = useMutation(CREATE_NEW_DECK);

    // for card data
    useEffect(() => {
        if (cardDataQuery && cardDataQuery.card) {
            setCardData(cardDataQuery.card);
        }
    }, [cardDataQuery]);

    // for deck data
    useEffect(() => {
        if (deckDataQuery && deckDataQuery.deck) {
            setDeckData(deckDataQuery.deck);
        }
    }, [deckDataQuery]);

    // function to add card to deck. aync bc wait f
    // const addCardToDeck = async () => {
    //     if (cardData) {
    //         try {
    //             await addCardToDeckMutation({
    //                 variables: {
    //                     id: cardData.id,
    //                 },
    //             });
    //             console.log('Card added to deck successfully');
    //         } catch (err) {
    //             console.error('Error adding card to deck:', err);
    //         }
    //     }
    // };

    const handleSelect = async (eventKey: string | null) => {
        if (eventKey && cardData) {
            try {
                switch (eventKey) {
                    case '1': await addCardtoUserMutation({
                        variables: {
                            cardId: cardData.id,
                        },
                    });
                        console.log('Card Saved to My Collection');
                        break;
                    case '2': {
                        const { data: newDeckData } = await createNewDeckMutation({
                            variables: {
                                name: 'Place Holder Name',
                            },
                        });
                        await addCardToDeckMutation({
                            variables: {
                                deckId: newDeckData.createDeck.id,
                                cardId: cardData.id,
                            },
                        }); 
                        console.log('Card added to new deck successfully');
                        break;
                    }
                    case '3': 
                    await addCardToDeckMutation({
                        variables: {
                            deckId: deckData?.id,
                            cardId: cardData.id,
                        },
                    });
                    console.log('Card added to existing deck successfully');
                    break;
                default:
                    break;
                }
            } catch (err) {
                console.error('Error handling selection:', err);
            }
        }
    };

        if (cardLoading || deckLoading) return <p>Loading...</p>;
        if (cardError) return <p>Error loading card data: {cardError.message}</p>;
        if (deckError) return <p>Error loading deck data: {deckError.message}</p>;

        return (
            <div>
                <h1>{cardData?.name}</h1>
                <h1>{deckData?.name}</h1>
                <ButtonGroup>
                    <DropdownButton as={ButtonGroup} title="Save Card" id="bg-nested-dropdown" onSelect={handleSelect}>
                        <Dropdown.Item eventKey="1">... To My Collection</Dropdown.Item>
                        <Dropdown.Item eventKey="2">... To New Deck</Dropdown.Item>
                        <Dropdown.Item eventKey="3">... To Existing Deck</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </div>
        )
    };

    export default CardtoDeck;