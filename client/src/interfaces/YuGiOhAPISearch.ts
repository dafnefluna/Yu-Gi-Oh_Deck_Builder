export interface YuGiOhCard {
    id: string;
    name: string;
    type: string;
    desc: string;
    card_images: {
        image_url: string;
    }[];
}