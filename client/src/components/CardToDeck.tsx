import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Cards } from '../interfaces/Card.js';
import { Decks } from '../interfaces/Deck.js';
import { ADD_CARD_TO_DECK, SAVE_NEW_CARD } from '../utils/mutations.js';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GETALLDECKS } from '../utils/queries.js';

interface CardtoDeckProps {
    card: Cards;
}

const CardtoDeck: React.FC<CardtoDeckProps> = ({ card }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Tracks selected "Save Card" option
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null); // Tracks selected deck
    const { data: deckDataQuery, loading: deckLoading, error: deckError } = useQuery(QUERY_GETALLDECKS);

    const [addCardToDeckMutation] = useMutation(ADD_CARD_TO_DECK);
    const [addCardToUserMutation] = useMutation(SAVE_NEW_CARD);

    // Effect to set the first deck as the default selected deck
    useEffect(() => {
        if (deckDataQuery && deckDataQuery.allDecks) {
            setSelectedDeckId(deckDataQuery.allDecks[0]?.id || null);
        }
    }, [deckDataQuery]);

    if (!card) return null;

    const handleSubmit = async () => {
        let cardId = card._id;
    
        // If the card doesn't have an _id yet (new card), save it first
        if (!cardId && selectedOption === '2') {
            const { data } = await addCardToUserMutation({
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
    console.log(`here is the deck data:`, deckDataQuery);
    
        // Find the deck by name in the allDecks array
        const selectedDeck = deckDataQuery?.allDecks.find((deck: Decks) => deck.name === selectedDeckId);
        console.log(`here is the selected deck:`, selectedDeck);

        // Perform the mutation based on the selected option
        if (selectedOption === '1') {
            console.log('Card Saved to My Collection');
            // Call SAVE_NEW_CARD mutation here if needed, if the card was not added already
        } else if (selectedOption === '2' && selectedDeck) {
            console.log(`here is the deckId: ${selectedDeck._id}`);
            console.log(`here is the cardId: ${cardId}`);
    
            // Add the card to the selected deck
            await addCardToDeckMutation({
                variables: {
                    deckId: selectedDeck._id,  // Use the deck's id here
                    cardId: cardId,
                },
            });
            console.log('Card added to existing deck successfully');
        } else {
            console.error('No deck selected');
        }
    };
    

    if (deckLoading) return <p>Loading...</p>;
    if (deckError) return <p>Error loading deck data: {deckError.message}</p>;

    return (
        <div>
            {/* Dropdown to select "Save Card" option */}
            <Form.Group controlId="saveCardOption">
                <Form.Label>Save Card</Form.Label>
                <Form.Control as="select" value={selectedOption || ''} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="1">To My Collection</option>
                    <option value="2">To Existing Deck</option>
                </Form.Control>
            </Form.Group>

            {/* If "To Existing Deck" is selected, show the deck selection */}
            {selectedOption === '2' && deckDataQuery?.allDecks && (
                <Form.Group controlId="selectDeck">
                    <Form.Label style={{paddingTop: "10px"}}>Select Deck:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedDeckId || ''}
                        onChange={(e) => setSelectedDeckId(e.target.value)}
                    >
                        <option value="">Select a deck</option>
                        {deckDataQuery.allDecks.map((deck: Decks) => (
                            <option key={deck.id} value={deck.id}> {/* Pass the deck.id */}
                                {deck.name} {/* Display deck name */}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}
<div style={{paddingTop: "10px"}}></div>
            {/* Submit button */}
            <Button variant="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default CardtoDeck;
