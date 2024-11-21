export interface YuGiOhCard {
    id: string;
    card_images: {
        image_url: string;
    }[];
    name: string;
    attribute: string;
    level: number;
    race: string;
    type: string;
    archetype: string;
    desc: string;
    atk: number;
    def: number;
}