import React, {FC, useCallback, useMemo} from "react";
import {Progress} from "@nextui-org/react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";

type Props = ComponentProps & Readonly<{
    currentStep: number;
    stepCount: number
}>;

/** Прогресс-бар задания. */
export const ProgressBar: FC<Props> = typedMemo(function TaskProgress(props){

    const getProgress = useCallback(
        () => Math.round((props.currentStep + 1) / props.stepCount * 100),
        [props.currentStep, props.stepCount]
    );

    const progress = useMemo(getProgress, [props.stepCount, props.currentStep, getProgress]);

    return <Progress aria-label="Task progress" value={progress} className={props.className}/>
});
