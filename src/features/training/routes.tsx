import React from "react";
import {RouteObject} from "react-router-dom";
import {TrainingPage} from "./pages/TrainingPage";
import {TrainingResultPage} from "./pages/TrainingResultPage";
import {TrainingSentencePage} from "./pages/TrainingSentencePage";
import {TrainingSentenceStartPage} from "./pages/TrainingSentenceStartPage";
import {TrainingStartPage} from "./pages/TrainingStartPage";
import {TrainingTaskPage} from "./pages/TrainingTaskPage";

export const trainingRoutes: RouteObject[] = [
    {
        path: 'training',
        children:[
            {
                path: '',
                element: <TrainingTaskPage />,
            },
            {
                path: 'start',
                element: <TrainingStartPage />,
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
