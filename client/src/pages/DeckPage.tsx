import { Container } from 'react-bootstrap';
import { Pagination } from 'antd';
import { Decks } from '../interfaces/Deck';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GETALLDECKS } from '../utils/queries';
import DeckList from '../components/DeckLayout';

const DeckPage: React.FC = () => {
    const [decks, setDecks] = useState<Decks[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCardsPer, setCardsPer] = useState(6);

    const { data: deckDataQuery, loading: deckLoading, error: deckError } = useQuery(QUERY_GETALLDECKS);

    useEffect(() => {
        if (deckDataQuery) {
            console.log('Deck Data Query:', deckDataQuery);
            setDecks(deckDataQuery?.allDecks || []);
        }
    }, [deckDataQuery]);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    if (deckLoading) return <p>Loading...</p>;
    if (deckError) return <p>Error loading deck data: {deckError.message}</p>;

    const lastIndex = currentPage * currentCardsPer;
    const firstIndex = lastIndex - currentCardsPer;
    const currentDecks = decks.slice(firstIndex, lastIndex);

    const onPageChange = (page: number, size: number) => {
        setCurrentPage(page);
        setCardsPer(size);
    };

    return (
        <Container>
            <h2 className="pt-5">
                {decks.length
                    ? `You have ${decks.length} decks:`
                    : `Please create a deck first!`}
            </h2>

            <DeckList decks={currentDecks} />

            <div className="d-flex justify-content-center mt-4 mb-4 pagination-container">
                <Pagination
                    hideOnSinglePage={true}
                    pageSize={currentCardsPer}
                    total={decks.length} // Total items, not pages
                    current={currentPage}
                    showSizeChanger={true}
                    pageSizeOptions={['6', '12', '18', '24']}
                    onChange={onPageChange}
                    size={'default'}
                />
            </div>
        </Container>
    );
};

export default DeckPage;
