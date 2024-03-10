import React from "react";
import {RouteObject} from "react-router-dom";
import {TrainingPage} from "./pages/TrainingPage";
import {TrainingResultPage} from "./pages/TrainingResultPage";

export const trainingRoutes: RouteObject[] = [
    {
        path: 'training',
        children:[
            {
                path: '',
                element: <TrainingPage />,
            },
            {
                path: 'result',
                element: <TrainingResultPage />,
            },
        ],
    }
]
