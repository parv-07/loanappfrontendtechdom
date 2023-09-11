import { useState } from 'react';
import LoginImage from './../images/login.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
  const navigate = useNavigate();
  // const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var name;
  function Login(e) {
    e.preventDefault();
    fetch('http://localhost:5500/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        // console.log(data);
        const name = data.user.userName;
        const id = data.user._id;
        console.log(data.user._id);
        localStorage.setItem('userid', data.user._id);
        if (data.user.userType == 'admin') {
          navigate(`/Admin`);
        } else {
          navigate('/userloan');
        }
        localStorage.setItem('name', name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="login-container">
        <img src={LoginImage} alt="login-imgae" className="img_login" />

        <form
          className="login-form-container"
          onSubmit={Login}
          style={{ width: '100%' }}
        >
          <h2>Login</h2>

          <div className="form-group">
            <label>Email Id:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
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
          <button type="submit">Login</button>
          <p>
            New Here?<Link to="signup">Sign Up</Link>
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
      </div>
    </>
  );
}
