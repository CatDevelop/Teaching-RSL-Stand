import React from 'react';
import {RouteObject} from "react-router-dom";
import {LearningTaskPage} from "./pages/LearningTaskPage";

export const learningRoutes: RouteObject[] = [
    {
        path: 'learning',
        children:[
            {
                path: '',
                element: <LearningTaskPage />,
            }
        ],
    }
]
