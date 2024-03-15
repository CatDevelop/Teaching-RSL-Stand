import {Word} from "./models/Word";
import HelloSignVideo from "../assets/video/ExhibitionStand/Привет.mp4"
import ISignVideo from "../assets/video/ExhibitionStand/Я.mp4"
import LoveSignVideo from "../assets/video/ExhibitionStand/Люблю.mp4"
import YouSignVideo from "../assets/video/ExhibitionStand/Тебя.mp4"
import WantSignVideo from "../assets/video/ExhibitionStand/Хочу.mp4"
import WorkSignVideo from "../assets/video/ExhibitionStand/Работаю.mp4"
import InSignVideo from "../assets/video/ExhibitionStand/В.mp4"
import AllSignVideo from "../assets/video/ExhibitionStand/Всех.mp4"
import EduSignVideo from "../assets/video/ExhibitionStand/Образование.mp4"
import DoSignVideo from "../assets/video/ExhibitionStand/Сделать.mp4"
import AccessSignVideo from "../assets/video/ExhibitionStand/Доступный.mp4"

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
        id: 2,
        text: "Я",
        recognitionText: 'я',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/I.mp4",
        gifSource: ISignVideo,
    },
    {
        id: 3,
        text: "Любить",
        recognitionText: 'любовь',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/Love.mp4",
        gifSource: LoveSignVideo,
    },
    {
        id: 4,
        text: "Тебя",
        recognitionText: 'ты',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: YouSignVideo,
    },

    {
        id: 5,
        text: "Хочу",
        recognitionText: 'хотеть',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: WantSignVideo,
    },
    {
        id: 6,
        text: "Сделать",
        recognitionText: 'делать',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: DoSignVideo,
    },
    {
        id: 7,
        text: "Образование",
        recognitionText: 'образовать',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: EduSignVideo,
    },
    {
        id: 9,
        text: "Всех",
        recognitionText: 'всё',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: AllSignVideo,
    },
    {
        id: 10,
        text: "Работаю",
        recognitionText: 'работать',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: WorkSignVideo,
    },
    {
        id: 11,
        text: "В",
        recognitionText: 'в',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: InSignVideo,
    },
    {
        id: 12,
        text: "Доступным",
        recognitionText: 'открывать',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: AccessSignVideo,
    },
]


export const StartThemeSentence: Sentence[] = [
    {
        id: 0,
            words: [0, 2, 10, 11, 7],
        text: "Привет, я работаю в образовании."
    },
    {
        id: 1,
        words: [2, 5, 6, 7, 12, 9],
        text: "Я хочу сделать образование доступным всем."
    },
    {
        id: 2,
        words: [2, 4, 3],
        text: "Я тебя люблю."
    },
]
