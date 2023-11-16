import React, {FC} from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';
import HomeLayout from '../components/WelcomeLayout';
import {learningRoutes} from '../features/learning/routes';
import {trainingRoutes} from '../features/training/routes';
import {errorsRouts} from "../features/errors/routes";
import {homeRoutes} from "../features/home/routes";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
            ...homeRoutes,
            ...learningRoutes,
            ...trainingRoutes,
        ]
    },
    ...errorsRouts
];

export const RootRouter: FC = () => useRoutes(routes);
