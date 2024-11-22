import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Cards } from '../interfaces/Card.js';
import { Decks } from '../interfaces/Deck.js';
import { ADD_CARD_TO_DECK, CREATE_NEW_DECK, SAVE_NEW_CARD } from '../utils/mutations.js';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GETALLDECKS} from '../utils/queries.js';


// this component is the functionality to be able to save a card from the user collection to a deck.
// use <CardtoDeck card={card} />
// note: i removed deckId from the getallcard query because I want all decks
interface CardtoDeckProps {
    card: Cards;
}

const CardtoDeck: React.FC<CardtoDeckProps> = ({ card }) => {
    // establish state for the card data
    // const [cardData, setCardData] = useState<Cards | null>(null);
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [eventKey, setEventKey] = useState<string | null>(null);
    // do the above for deckdata and create an interface


    // the problem is the querygetsinglecard part. 
    // establish useQuery for card with id
    // const { data: cardDataQuery, loading: cardLoading, error: cardError } = useQuery(QUERY_GETSINGLECARD, {
    //     variables: { cardId: card.id },
    // });

    const { data: deckDataQuery, loading: deckLoading, error: deckError } = useQuery(QUERY_GETALLDECKS)
    // establish usemutation to get the addcardtodeck mutation
    const [addCardToDeckMutation] = useMutation(ADD_CARD_TO_DECK);
    const [addCardtoUserMutation] = useMutation(SAVE_NEW_CARD);
    const [createNewDeckMutation] = useMutation(CREATE_NEW_DECK);

    // for card data
    // useEffect(() => {
    //     if (cardDataQuery && cardDataQuery.card) {
    //         setCardData(cardDataQuery.cardById);
    //     }
    // }, [cardDataQuery]);

    useEffect(() => {
        if (deckDataQuery && deckDataQuery.allDecks) {
            setSelectedDeckId(deckDataQuery.allDecks[0]?.id || null);
        }
    }, [deckDataQuery]);

    if (!card) return null;

// this is the save functionality
    const handleSelect = async (eventKey: string | null) => {
        setEventKey(eventKey);
        if (eventKey) {
            try {
                let cardId = card.id;
    
                // Save the card if it doesn't have an _id yet, for the cards from the api call
                if (!cardId) {
                    const { data } = await addCardtoUserMutation({
                        variables: {
                            input: {
                                name: card.name,
                                attribute: card.attribute,
                                level: card.level,
                                race: card.race,
                                type: card.type,
                                archetype: card.archetype,
                                description: card.description,
                                atk: card.attack,
                                def: card.defense,
                                image: card.image,
                            },
                        },
                    });
                    cardId = data.addCardToUser._id;
                }
    
                switch (eventKey) {
                    case '1':
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
                                cardId: cardId,
                            },
                        });
                        console.log('Card added to new deck successfully');
                        break;
                    }
                    case '3':
                        if (selectedDeckId) {
                            await addCardToDeckMutation({
                                variables: {
                                    deckId: selectedDeckId,
                                    cardId: cardId,
                                },
                            });
                            console.log('Card added to existing deck successfully');
                        } else {
                            console.error('No deck selected');
                        }
                        break;
                    default:
                        break;
                }
            } catch (err) {
                console.error('Error handling selection:', err);
            }
        }
    };

    if (deckLoading) return <p>Loading...</p>;
    // if (cardError) return <p>Error loading card data: {cardError.message}</p>;
    if (deckError) return <p>Error loading deck data: {deckError.message}</p>;

    return (
        <div>
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Save Card" id="bg-nested-dropdown" onSelect={handleSelect}>
                    <Dropdown.Item eventKey="1">... To My Collection</Dropdown.Item>
                    <Dropdown.Item eventKey="2">... To New Deck</Dropdown.Item>
                    <Dropdown.Item eventKey="3">... To Existing Deck</Dropdown.Item>
                </DropdownButton>
                {eventKey === '3' && (
                    <DropdownButton as={ButtonGroup} title="Select Deck" id="deck-dropdown" onSelect={(e) => setSelectedDeckId(e)}>
                        {deckDataQuery.allDecks.map((deck: Decks) => (
                            <Dropdown.Item key={deck.id} eventKey={deck.id}>
                                {deck.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                )}
            </ButtonGroup>
        </div>
    );
};

export default CardtoDeck;