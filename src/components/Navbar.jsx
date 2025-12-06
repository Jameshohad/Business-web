import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      
      {/* LOGO 图片 */}
      <img className="logo-img" src={logo} alt="Logo" />

      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/course">Course</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Sign up</Link>
      </div>

    </nav>
  );
}
