import {useCallback} from "react";
import {Word} from "../models/Word";
import {SelectObjectState} from "../models/SelectState";

export const getInitialSelectObjectsState = (variants: Word[]) => {
    return variants.map<SelectObjectState>(variant => (
        {
            wordObject: variant,
            state: "default"
        }
    ))
}
