import {Word} from "./models/Word";
import HelloSignVideo from "../assets/video/ExhibitionStand/Привет.mp4"
import FriendSignVideo from "../assets/video/ExhibitionStand/Друг.mp4"
import ISignVideo from "../assets/video/ExhibitionStand/Я.mp4"
import LoveSignVideo from "../assets/video/ExhibitionStand/Люблю.mp4"
import YouSignVideo from "../assets/video/ExhibitionStand/Тебя.mp4"
import WantSignVideo from "../assets/video/ExhibitionStand/Хочу.mp4"
import WorkSignVideo from "../assets/video/ExhibitionStand/Работаю.mp4"
import InSignVideo from "../assets/video/ExhibitionStand/В.mp4"
import AllSignVideo from "../assets/video/ExhibitionStand/Всех.mp4"
import ForSignVideo from "../assets/video/ExhibitionStand/Для.mp4"
import EduSignVideo from "../assets/video/ExhibitionStand/Образование.mp4"
import DoSignVideo from "../assets/video/ExhibitionStand/Сделать.mp4"

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
        text: "Друг",
        recognitionText: 'друг',
        gifSource: FriendSignVideo,
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/Friend.mp4",
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
        id: 8,
        text: "Для",
        recognitionText: 'для',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        gifSource: ForSignVideo,
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
]

export const StartThemeTasks: taskType[] = [
    "SelectWord",
    "SelectGIFByWord",
    "MatchWordAndGIF"
]

export const StartThemeSentence: Sentence[] = [
    {
        id: 0,
        words: [2, 3, 4],
        text: "Я люблю тебя."
    },
    {
        id: 1,
        words: [2, 5, 6, 7, 8, 9],
        text: "Я хочу сделать образование для всех."
    },
    {
        id: 2,
        words: [2, 10, 11, 7],
        text: "Я работаю в образовании."
    }
]
