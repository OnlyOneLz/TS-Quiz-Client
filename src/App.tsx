import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/homePage';
import QuizPage from './components/quiz/quizPage';
import QuizFinalPage from './components/quiz/quizFinalPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/quiz/final" element={<QuizFinalPage />} />
            </Routes>
        </Router>
    );
}

export default App;
