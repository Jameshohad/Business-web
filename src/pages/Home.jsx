import hero from "../assets/hero.jpg";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">

      <div className="banner">
        Learn Chinese Easily — Designed specifically for all learners interested in Chinese.
      </div>

      <div className="content">

        <img src={hero} alt="Learning Chinese" />

      <div className="info">
  <div className="card">Chinese is one of the most widely spoken languages ​in the world.</div>
  <div className="card">Learning Chinese can help you better understand Chinese culture.</div>
  <div className="card">The course is specifically designed for all learners interested in Chinese.</div>

  <div className="feature-box">
    <h4>Platform Features</h4>

    <ul>
      <li>📊 Learning Progress Tracking</li>
      <li>🎧 Pronunciation Practice with AI</li>
      <li>📝 Weekly Quiz Challenges</li>
    </ul>
  </div>
</div>

      </div>

    </div>
  );
}
