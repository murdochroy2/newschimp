import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { Routes, Route } from "react-router-dom";
export const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY_2
  const [progress, setProgress] = useState(0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      {/* <Router> Router component already present in index.js */}
        <Navbar />
        <LoadingBar height={3} color="#c0392b" progress={progress} /><div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="home" category="general" />}></Route>
            <Route path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" category="Business" />}></Route>
            <Route path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" category="Entertainment" />}></Route>
            <Route path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" category="General" />}></Route>
            <Route path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" category="Health" />}></Route>
            <Route path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" category="Science" />}></Route>
            <Route path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" category="Sports" />}></Route>
            <Route path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" category="Technology" />}></Route>
          </Routes>
        </div>
      {/* </Router> */}
    </div>
  )

}


export default App