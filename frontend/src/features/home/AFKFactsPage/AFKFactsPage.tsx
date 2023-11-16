import React, {FC, useCallback} from "react";
import styles from "./AFKFactsPage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../../components/Typography";
import {typedMemo} from "../../../core/utils/typedMemo";
import Gradient from '../../../assets/video/gradient.mp4'
import LogoStand from '../../../assets/images/LogoStandMonochrome.svg'
import {Fact} from "../components/fact";
import {Facts} from "../components/facts";

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

            <img className={styles.afkPage__logo} src={LogoStand} alt="Логотип" width={1200}/>
            <Facts/>
            <Typography
                variant="p"
                className={styles.afkPage__tap}
            >
                Нажмите на экран, чтобы продолжить
            </Typography>
        </div>
    )
})
