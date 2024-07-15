import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Website!</h1>
      <p className="home-description">Product Management System</p>
      <div className="buttons">
        <Link to="/signup" className="button-link">
          <button className="signup-button">Sign Up</button>
        </Link>
        <Link to="/login" className="button-link">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
