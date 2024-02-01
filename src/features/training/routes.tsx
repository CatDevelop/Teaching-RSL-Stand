import React from "react";
import {RouteObject} from "react-router-dom";
import {TrainingPage} from "./pages/TrainingPage";
import {TrainingResultPage} from "./pages/TrainingResultPage";
import {TrainingStartPage} from "./pages/TrainingStartPage";

export const trainingRoutes: RouteObject[] = [
    {
        path: 'training',
        children:[
            {
                path: '',
                element: <TrainingPage />,
            },
            {
                path: 'start',
                element: <TrainingStartPage />,
            },
            {
                path: 'result',
                element: <TrainingResultPage />,
            },
        ],
    }
]
