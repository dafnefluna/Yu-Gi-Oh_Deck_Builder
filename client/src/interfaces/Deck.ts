import { Cards } from './Card.js'
export interface Decks {
    id: string
    name: string
    playable: boolean
    cards: [Cards]
    type: string
    user: string
}

