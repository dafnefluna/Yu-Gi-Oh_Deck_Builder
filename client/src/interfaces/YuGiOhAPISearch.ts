export interface YuGiOhCard {
    id: BigInteger;
    card_images: {
        image_url: string;
    }[];
    name: string;
    attribute: string;
    level: BigInteger;
    race: string;
    type: string;
    archetype: string;
    desc: string;
    atk: BigInteger;
    def: BigInteger;
}