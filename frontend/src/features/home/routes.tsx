import React from 'react';
import {RouteObject} from "react-router-dom";
import {AFKFactsPage} from "./pages/AFKFactsPage/AFKFactsPage";
import {HomePage} from "./pages/HomePage";

export const homeRoutes: RouteObject[] = [
    {
        path: '',
        element: <AFKFactsPage/>
    },
    {
        path: 'home',
        element: <HomePage/>
    },
]
