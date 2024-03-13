import React from "react";
import {RouteObject} from "react-router-dom";
import {TrainingPage} from "./pages/TrainingPage";
import {TrainingResultPage} from "./pages/TrainingResultPage";
import {TrainingSentencePage} from "./pages/TrainingSentencePage";
import {TrainingSentenceStartPage} from "./pages/TrainingSentenceStartPage";

export const trainingRoutes: RouteObject[] = [
    {
        path: 'training',
        children:[
            {
                path: '',
                element: <TrainingPage />,
            },
            {
                path: 'sentence',
                element: <TrainingSentencePage />,
            },
            {
                path: 'sentence/start',
                element: <TrainingSentenceStartPage />,
            },
            {
                path: 'result',
                element: <TrainingResultPage />,
            },
        ],
    }
]
