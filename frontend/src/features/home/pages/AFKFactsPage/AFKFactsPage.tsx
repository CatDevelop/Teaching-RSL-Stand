import React, {FC, useCallback} from "react";
import styles from "./AFKFactsPage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../../../components/Typography";
import {typedMemo} from "../../../../core/utils/typedMemo";
import Gradient from '../../../../assets/video/gradient2.mp4'
import LogoStand from '../../../../assets/images/LogoStandMonochrome.svg'
import {Facts} from "../../components/facts";

export const AFKFactsPage: FC = typedMemo(function AFKFactsPage() {
    const navigate = useNavigate();

    const toHome = useCallback(() => navigate("/home"), [navigate])

    return (
        <div className={styles.afkPage} onClick={toHome}>
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
                Нажмите на экран, чтобы продолжить
            </Typography>
        </div>
    )
})
