import "./Sign.css";

export default function Sign() {
  return (
    <div className="signup">

      <div className="signup-card">

        <h2>Create your account</h2>
        <p>Start learning Chinese today</p>

        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Create Account</button>

      </div>

    </div>
  );
}
