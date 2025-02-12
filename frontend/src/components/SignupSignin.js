import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupSignin() {
  const [showSignin, setShowSignin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 const navigate = useNavigate();
  
  

  //To show Signup form
  const handleSignUp = () => {
    setShowSignin(false);
  }

  //To show Signin form
  const handleSignin = () => {
    setShowSignin(true);
  }

  //handle user signup
  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log("registration button has been clicked")

    try{
      const response = await axios.post('http://localhost:5000/signup', {first_name, last_name, username, password})
      alert(response.data);
      setSuccessMessage('Registration successful!');
    }
    catch(error){
      if (error.response && error.response.status === 400) {
        alert('username already exists');
        setErrorMessage('Username already exists');
      } else {
        alert('Error signing up');
        setErrorMessage('Error signing up');
      }
    }

  }

  //handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login button has been clicked")

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      
      // Assuming the response contains a success message and user data
      if (response.data.userId) {
        setSuccessMessage('Login successful!'); // Set success message
        //console.log('Login successful:', response.data); 
        // alert('Login successful! Welcome, ' + response.data.username); // Alert the user
        // Store user data in localStorage or context
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username_local', response.data.username);
        // console.log('User ID:', response.data.userId);
        const isLoggedIn = true;
        // Redirect to another page if needed
        if (isLoggedIn){
          // navigate('/forum');
          navigate('/home');
        }
        //navigate('/home'); // Uncomment if using react-router
      }
    }catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Invalid username or password');
        setErrorMessage('Invalid username or password');
      } else {
        alert('Error logging in');
        setErrorMessage('Error logging in');
  }
}
  }

  return (
    <div>
      {showSignin ? (
        <div className="login">
          <h4>Login</h4>
          <form onSubmit={handleLogin}>
            <div className="text_area">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                className="text_input"
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="text_area">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="text_input"
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <input
            type="submit"
            value="LOGIN"
            className="btn"
          />
        </form>
        <p className="link" href="/signup" onClick={handleSignUp}>Sign Up</p>
      </div>
      
      ):(
        <div>
          <div className="signup">
          <h4>signup</h4>
          <form onSubmit={handleRegistration}>
            <div className="text_area">
              <input
                type="text"
                id="first_name"
                required
                name="first_name"
                value={first_name}
                placeholder='first name'
                className="text_input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="text_area">
              <input
                type="text"
                id="last_name"
                required
                name="last_name"
                value={last_name}
                placeholder='last name'
                className="text_input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="text_area">
              <input
                type="text"
                id="username"
                required
                name="username"
                value={username}
                placeholder='username'
                className="text_input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="text_area">
              <input
                type="password"
                id="password"
                required
                name="password"
                placeholder='Password'
                className="text_input"
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="btn"
          />
        </form>
        <p className="link" href="/signup" onClick={handleSignin}>Sign in</p>
      </div>
        </div>
      )}
    </div>
  )
}

export default SignupSignin