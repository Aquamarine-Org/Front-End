import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default LandingPage;
