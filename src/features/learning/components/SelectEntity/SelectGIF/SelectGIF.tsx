import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {SignVideo} from "../../../../../components/SignVideo";
import {SelectContainer, SelectContainerProps} from "../SelectContainer";

/** GIF, которое можно выбрать. */
export const SelectGIF: FC<SelectContainerProps> = typedMemo(function SelectGIF(props) {
    return (
        <SelectContainer {...props}>
            <SignVideo src={props.wordObject.gifSource}/>
        </SelectContainer>
    );
});
