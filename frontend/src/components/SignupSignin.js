import React from 'react';
import { useState } from 'react';

function SignupSignin() {
  const [showSignin, setShowSignin] = useState(true);

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
                defaultValue="username"
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
                id="username"
                name="username"
                defaultValue="username"
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
            value="LOGIN"
            className="btn"

          />
        </form>
        <p className="link" href="/signup" onClick={handleSignin}>Sign Up</p>
      </div>
        </div>
      )}
    </div>
  )
}

export default SignupSignin