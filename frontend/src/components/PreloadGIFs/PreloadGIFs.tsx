import {FC, useEffect} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import HelloSignVideo from "../../assets/video/ExhibitionStand/Привет.mp4"
import FriendSignVideo from "../../assets/video/ExhibitionStand/Друг.mp4"
import ISignVideo from "../../assets/video/ExhibitionStand/Я.mp4"
import LoveSignVideo from "../../assets/video/ExhibitionStand/Люблю.mp4"
import YouSignVideo from "../../assets/video/ExhibitionStand/Тебя.mp4"

/** Предзагрузка GIF. */
export const PreloadGIFs: FC = typedMemo(function PreloadGIFs(){
    const gifs = [
        "https://ren-design.ru/api/teaching-rsl/1.0/video/Love.mp4",
        "https://ren-design.ru/api/teaching-rsl/1.0/video/Hi.mp4",
        "https://ren-design.ru/api/teaching-rsl/1.0/video/You.mp4",
        "https://ren-design.ru/api/teaching-rsl/1.0/video/Friend.mp4",
        "https://ren-design.ru/api/teaching-rsl/1.0/video/I.mp4",
    ];

    useEffect(() => {
        gifs.forEach(gif => {
            const video = document.createElement('video');
            video.src = gif;
            video.preload = 'auto';
        });
    }, [gifs]);

    return null;
})
