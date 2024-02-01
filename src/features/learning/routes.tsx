import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningTaskPage} from "./pages/LearningTaskPage";
import {LearningResultPage} from "./pages/LearningResultPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        children:[
            {
                path: '',
                element: <LearningTaskPage />,
            },
            {
                path: 'result',
                element: <LearningResultPage/>,
            },
        ],
    }
]
