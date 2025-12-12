import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SafeRouteMap from "../src/components/SafeRouteMap"; // <-- Make sure SafeRouteMap.tsx is in src/
import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                {/* Default Home Page */}
                <Route
                    path="/"
                    element={
                        <div className="App">
                            <header className="App-header">
                                <img
                                    src={logo}
                                    className="App-logo"
                                    alt="logo"
                                />
                                <p>
                                    Edit <code>src/App.tsx</code> and save to
                                    reload.
                                </p>
                                <a
                                    className="App-link"
                                    href="https://reactjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Learn React
                                </a>
                            </header>
                        </div>
                    }
                />

                {/* Safe Route Map Page */}
                <Route path="/safe-route" element={<SafeRouteMap />} />
            </Routes>
        </Router>
    );
}

export default App;
