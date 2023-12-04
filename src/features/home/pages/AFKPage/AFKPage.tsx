import React, {FC, useCallback} from "react";
import styles from "./AFKPage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../../../components/Typography";
import {typedMemo} from "../../../../core/utils/typedMemo";
import LogoStand from '../../../../assets/images/LogoStandMonochrome.svg'
import {Facts} from "../../components/facts";
import {Gradient} from "../../../../components/Gradient/Gradient";

export const AFKPage: FC = typedMemo(function AFKFactsPage() {
    const navigate = useNavigate();

    const toHome = useCallback(() => navigate("/learning"), [navigate])

    return (
        <div className={styles.afkPage} onClick={toHome}>
            <Gradient className={styles.afkPage__gradient}/>

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
