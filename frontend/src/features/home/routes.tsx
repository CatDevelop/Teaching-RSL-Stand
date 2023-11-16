import React from 'react';
import {RouteObject} from "react-router-dom";
import {AFKPage} from "./pages/AFKPage";
import {AFKFactsPage} from "./pages/AFKFactsPage";
import {HomePage} from "./pages/HomePage";

export const homeRoutes: RouteObject[] = [
    {
        path: '',
        element: <AFKFactsPage/>
    },
    // {
    //     path: 'facts',
    //     element: <AFKFactsPage/>
    // },
    {
        path: 'home',
        element: <HomePage/>
    },
]
