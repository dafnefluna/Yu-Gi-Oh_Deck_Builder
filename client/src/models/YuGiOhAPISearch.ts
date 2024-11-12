export interface YuGiOhCardInfo {
    name: string;
    type: string;
    description: string;
    image: {
        smallThumbnail: string;
        thumbnail: string;
    };
}

export interface YuGiOhCard {
    id: string;
    cardInfo: YuGiOhCardInfo;
}