import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningStartPage} from "./pages/LearningStartPage";
import {LearningTaskPage} from "./pages/LearningTaskPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        children:[
            {
                path: '',
                element: <LearningTaskPage />,
            },
            {
                path: 'start',
                element: <LearningStartPage />,
            }
        ],
    }
]
