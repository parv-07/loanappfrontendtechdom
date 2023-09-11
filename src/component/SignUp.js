import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginImage from './../images/login.jpg';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function Login(e) {
    e.preventDefault();
    fetch('http://localhost:5500/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.user);
        // if (data.user.userType == "admin") {
        //   toast.error("Please enter valid credentials");
        // } else if (
        //   data.user.email != email &&
        //   DataTransfer.password != password
        // ) {
        //   console.log("email", data.user.email);
        //   console.log(DataTransfer);
        //   console.log("password", DataTransfer.password);
        //   toast.error("Invalid email or password");
        // } else if (data.error) {
        //   toast.error("Please try again");
        // } else {
        //   localStorage.setItem("jwt", data.token);
        //   localStorage.setItem("user", JSON.stringify(data.user));
        //   localStorage.setItem("userImage", data.user.pic);
        //   console.log(data);
        //   //   dispatch({ type: "USER", payload: data.user })
        //   toast.success("Succesfully loggedIn");
        //   localStorage.setItem("isLoggedIn", "true");
        //   history("/dashboard");
        // }
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <form className="login-form-container" onSubmit={Login}>
        <h2>SignUp</h2>
        <div className="form-group">
          <label>UserName:</label>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Id:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">SignUp</button>
        <p>
          Already a user?<Link to="/">Sign In</Link>
        </p>
        <div className="social-media">
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>

          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} size="1x" />
          </a>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faGoogle} size="1x" />
          </a>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </form>
    </>
  );
}
