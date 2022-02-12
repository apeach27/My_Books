import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Add from './pages/Add';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import Error from './pages/Error';
import history from './history';


function App() {
    return (
        <ErrorBoundary FallbackComponent={Error}>
            <ConnectedRouter history={history}>
                <Routes>
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/book/:id" element={<Detail />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ConnectedRouter>
        </ErrorBoundary>
    );
}

export default App;
