import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Course from "./pages/Course";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import Sign from "./pages/Sign";

import "./App.css";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Sign />} />
      </Routes>

    </Router>
  );
}

export default App;

