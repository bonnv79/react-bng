import React, { useState } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import RecordList from "./pages/recordList";
import Edit from "./pages/edit";
import Create from "./pages/create";
import { Loading } from "./components";
import config from '../package.json';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
          <Route exact path="/" element={<RecordList setLoading={setLoading} />} />
          <Route path="/edit/:id" element={<Edit setLoading={setLoading} />} />
          <Route path="/create" element={<Create setLoading={setLoading} />} />
        </Routes>
      </div>
      <Loading open={loading} />
      <span className="version">v{config?.version}</span>
    </div>
  );
}

export default App;
