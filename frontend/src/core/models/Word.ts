export type Word = Readonly<{
    id: number;
    text: string;
    recognitionText: string;
    gifSource: string;
    altGifSource?: string;
    imageSource?: string;
}>
