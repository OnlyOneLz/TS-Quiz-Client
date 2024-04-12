import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login'
import Home from './components/home/homePage'
import QuizPage2 from './components/quiz/quizPage2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/quiz2" element={<QuizPage2/>} />
      </Routes>
    </Router>
  );
}

export default App;

