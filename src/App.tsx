import React from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {RootRouter} from "./routes/RootRouter";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp() {
    return (
        <div className="App">
            <MantineProvider>
                <BrowserRouter>
                    <RootRouter/>
                </BrowserRouter>
            </MantineProvider>
        </div>
    );
}
