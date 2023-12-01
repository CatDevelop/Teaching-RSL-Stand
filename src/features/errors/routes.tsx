import React from 'react';
import {RouteObject} from "react-router-dom";
import {NotFoundPage} from "./NotFoundPage/NotFoundPage";

export const errorsRouts: RouteObject[] = [
    {
        path: '',
        children:[
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    }
]
