import React from 'react';
import { useState } from 'react';

function SignupSignin() {
  const [showSignin, setShowSignin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  

  //To show Signup form
  const handleSignUp = () => {
    setShowSignin(false);
  }

  //To show Signin form
  const handleSignin = () => {
    setShowSignin(true);
  }

  return (
    <div>
      {showSignin ? (
        <div className="login">
          <h4>Login</h4>
          <form>
            <div className="text_area">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                className="text_input"
                placeholder='username'
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
          <form>
            <div className="text_area">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={first_name}
                placeholder='first name'
                className="text_input"
              />
            </div>
            <div className="text_area">
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={last_name}
                placeholder='last name'
                className="text_input"
              />
            </div>
            <div className="text_area">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder='username'
                className="text_input"
              />
            </div>
            <div className="text_area">
              <input
                type="password"
                id="password"
                name="password"
                defaultValue="password"
                className="text_input"
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