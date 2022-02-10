import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import { ErrorBoundary } from 'react-error-boundary';


function App() {
    return (
        <ErrorBoundary FallbackComponent={Error}>
            <BrowserRouter >
                <Routes>
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/book/:id" element={<Detail />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/singin" element={<Signin />} />
                    <Route path="/" element={<Home />} />
                    {/* <Route component={<NotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
