import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'
import Home from './components/home/homePage'
import Quiz from './components/quiz/quizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/quiz" element={<Quiz/>} />
      </Routes>
    </Router>
  );
}

export default App;

