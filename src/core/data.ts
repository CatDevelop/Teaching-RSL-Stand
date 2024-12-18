import {Word} from "./models/Word";
import HelloSignVideo from "../assets/video/ExhibitionStand/Привет.mp4"
import FriendSignVideo from "../assets/video/ExhibitionStand/Друг.mp4"
import ISignVideo from "../assets/video/ExhibitionStand/Я.mp4"
import LoveSignVideo from "../assets/video/ExhibitionStand/Люблю.mp4"
import YouSignVideo from "../assets/video/ExhibitionStand/Тебя.mp4"

export type taskType = "SelectWord" | "SelectGIFByWord" | "MatchWordAndGIF"
export const StartThemeWords: Word[] = [
    {
        id: 0,
        text: "Привет",
        recognitionText: 'привет',
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/Hi.mp4",
        gifSource: "https://storage.yandexcloud.net/akhidov-ivr/hi.mp4",
        // gifSource: HelloSignVideo,
    },
    {
        id: 1,
        text: "Друг",
        recognitionText: 'друг',
        // gifSource: FriendSignVideo,
        gifSource: "https://storage.yandexcloud.net/akhidov-ivr/friend.mp4",
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/Friend.mp4",
    },
    {
        id: 2,
        text: "Я",
        recognitionText: 'я',
        gifSource: "https://storage.yandexcloud.net/akhidov-ivr/i.mp4",
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/I.mp4",
        // gifSource: ISignVideo,
    },
    {
        id: 3,
        text: "Любить",
        recognitionText: 'любовь',
        gifSource: "https://storage.yandexcloud.net/akhidov-ivr/love.mp4",
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/Love.mp4",
        // gifSource: LoveSignVideo,
    },
    {
        id: 4,
        text: "До свидание",
        recognitionText: 'до свидание',
        gifSource: "https://storage.yandexcloud.net/akhidov-ivr/bye.mp4",
        // gifSource: "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        // gifSource: YouSignVideo,
    },
]

export const StartThemeTasks: taskType[] = [
    "SelectWord",
    "SelectGIFByWord",
    "MatchWordAndGIF"
]
