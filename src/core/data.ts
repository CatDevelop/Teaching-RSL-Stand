import {Word} from "./models/Word";
import HelloSignVideo from "../assets/video/ExhibitionStand/Привет.mp4"
import ISignVideo from "../assets/video/ExhibitionStand/Я.mp4"
import LoveSignVideo from "../assets/video/ExhibitionStand/Люблю.mp4"
import YouSignVideo from "../assets/video/ExhibitionStand/Тебя.mp4"
import FriendSignVideo from "../assets/video/ExhibitionStand/Друг.mp4"

export type taskType = "SelectWord" | "SelectGIFByWord" | "MatchWordAndGIF"

export type Sentence = {
    id: number,
    words: number[],
    text: string
}

export const StartThemeWords: Word[] = [
    {
        id: 0,
        text: "Привет",
        recognitionText: 'привет',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/Hi.mp4",
        gifSource: HelloSignVideo,
    },
    {
        id: 1,
        text: "Я",
        recognitionText: 'я',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/I.mp4",
        gifSource: ISignVideo,
    },
    {
        id: 2,
        text: "Любить",
        recognitionText: 'любовь',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/Love.mp4",
        gifSource: LoveSignVideo,
    },
    {
        id: 3,
        text: "Тебя",
        recognitionText: 'ты',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: YouSignVideo,
    },
    {
        id: 4,
        text: "Друг",
        recognitionText: 'друг',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: FriendSignVideo,
    },
]


export const StartThemeSentence: Sentence[] = [
    {
        id: 0,
            words: [0, 1, 2, 3, 4],
        text: "Привет, я люблю тебя, друг."
    }
]
