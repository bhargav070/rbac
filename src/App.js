import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css"; 
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {

    return (
        <div className="app">
            <div className="dashboard">
                <Dashboard />
            </div>
        </div>
    );
};

export default App;
