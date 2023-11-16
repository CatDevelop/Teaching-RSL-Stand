import React from 'react';
import {RouteObject} from "react-router-dom";
import {AFKPage} from "./AFKPage";
import {AFKFactsPage} from "./AFKFactsPage";
import {HomePage} from "./HomePage";

export const homeRoutes: RouteObject[] = [
    {
        path: '',
        element: <AFKPage/>
    },
    {
        path: 'facts',
        element: <AFKFactsPage/>
    },
    {
        path: 'home',
        element: <HomePage/>
    },
]
