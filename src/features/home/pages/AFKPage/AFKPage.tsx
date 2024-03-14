import React, {FC, useCallback, useEffect} from "react";
import styles from "./AFKPage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../../../components/Typography";
import {typedMemo} from "../../../../core/utils/typedMemo";
import LogoStand from '../../../../assets/images/LogoStandMonochrome.svg'
import {Facts} from "../../components/facts";
import RightClicker from "../../../../assets/images/RightClicker.svg";
import Gradient from '../../../../assets/video/gradient2.mp4'

export const AFKPage: FC = typedMemo(function AFKFactsPage() {
    const navigate = useNavigate();
    localStorage.setItem("Teaching-RSL-correct-words", "[]")

    const toLearningStart = useCallback(() => navigate("/learning/start"), [navigate])

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            toLearningStart()
        }
    }, [toLearningStart])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

    return (
        <div className={styles.afkPage} onClick={toLearningStart}>
            <video
                className={styles.afkPage__gradient}
                src={Gradient}
                autoPlay
                loop
                muted
            />

            <img className={styles.afkPage__logo} src={LogoStand} alt="Логотип"/>
            <div className={styles.afkPage__factsContainer}>
                <Facts className={styles.afkPage__facts}/>
            </div>

            <Typography
                variant="p"
                className={styles.afkPage__tap}
            >
                Нажмите на <img className={styles.afkPage__tap__clicker} src={RightClicker} alt={"Правый кликер"}/>, чтобы продолжить
            </Typography>
        </div>
    )
})
