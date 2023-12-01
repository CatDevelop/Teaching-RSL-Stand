import React from 'react';
import {RouteObject} from "react-router-dom";
import {AFKPage} from "./pages/AFKPage";
import {HomePage} from "./pages/HomePage";

export const homeRoutes: RouteObject[] = [
    {
        path: '',
        element: <AFKPage/>
    },
    {
        path: 'home',
        element: <HomePage/>
    },
]
