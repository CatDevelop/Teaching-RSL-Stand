import React from 'react';
import {RouteObject} from "react-router-dom";
import {ConstructorPage} from "./pages/ConstructorPage";

export const adminRoutes: RouteObject[] = [
    {
        path: 'admin',
        children:[
            {
                path: 'constructor',
                element: <ConstructorPage />,
            }
        ],
    }
]
