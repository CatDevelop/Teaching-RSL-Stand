import React, {FC, useCallback, useEffect} from "react";
import styles from "./AFKPage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../../../components/Typography";
import {typedMemo} from "../../../../core/utils/typedMemo";
import LogoStand from '../../../../assets/images/LogoStandMonochrome.svg'
import {Facts} from "../../components/facts";
import {Gradient} from "../../../../components/Gradient/Gradient";
import RightClicker from "../../../../assets/images/RightClicker.svg";

export const AFKPage: FC = typedMemo(function AFKFactsPage() {
    const navigate = useNavigate();

    const toLearning = useCallback(() => navigate("/learning/start"), [navigate])

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            toLearning()
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, []);

    return (
        <div className={styles.afkPage} onClick={toLearning}>
            <Gradient className={styles.afkPage__gradient}/>

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
