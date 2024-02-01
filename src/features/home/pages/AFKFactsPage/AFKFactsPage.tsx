import React, {FC, useCallback, useEffect} from "react";
import styles from "./AFKFactsPage.module.css";
import {useNavigate} from "react-router-dom";
import {Typography} from "../../../../components/Typography";
import {typedMemo} from "../../../../core/utils/typedMemo";
import Gradient from '../../../../assets/video/gradient2.mp4'
import LogoStand from '../../../../assets/images/LogoStandMonochrome.svg'
import {Facts} from "../../components/facts";
import {LocalStorageService} from "../../../../api/services/localStorageService";
import {initialSettings, Settings} from "../../../admin/pages/ConstructorPage/ConstructorPage";
import RightClicker from "../../../../assets/images/RightClicker.svg";

export const AFKFactsPage: FC = typedMemo(function AFKFactsPage() {
    const navigate = useNavigate();
    const settings: Settings = LocalStorageService.get('Teaching-RSL-Settings') || initialSettings;

    const toHome = useCallback(() => {
        settings.general.selectMenu ?
            navigate("/home") : navigate("/learning")
    }, [navigate, settings])

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        if (settings.general.clickerMode && event.key === "ArrowRight") {
            event.preventDefault();
            toHome()
        }
    }, [settings, toHome])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown]);

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

            {
                settings.general.clickerMode ?
                    <Typography
                        variant="p"
                        className={styles.afkPage__tap}
                    >
                        Нажмите на <img className={styles.afkPage__tap__clicker} src={RightClicker}
                                        alt={"Правый кликер"}/>,
                        чтобы продолжить
                    </Typography> :
                    <Typography
                        variant="p"
                        className={styles.afkPage__tap}
                    >
                        Нажмите на экран, чтобы продолжить
                    </Typography>
            }
        </div>
    )
})
