import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyApp from './App';
import {ToastContainer} from "react-toastify";
import {NextUIProvider} from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <>
        <NextUIProvider>
            <MyApp/>
        </NextUIProvider>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
        />
    </>
)
