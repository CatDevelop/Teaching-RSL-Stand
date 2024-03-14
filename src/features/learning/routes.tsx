import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningStartPage} from "./pages/LearningStartPage";
import {LearningPage} from "./pages/LearningPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        children:[
            {
                path: '',
                element: <LearningPage />,
            },
            {
                path: 'start',
                element: <LearningStartPage />,
            }
        ],
    }
]
