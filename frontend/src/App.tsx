import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
// import { auth } from './config/firebase';
// import { createUserWithEmailAndPassword, User, getIdToken,  } from 'firebase/auth';
// import { useState } from 'react';
import Nav from "./components/Nav";

function App() {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [error, setError] = useState("")
  // const [user, setUser] = useState<User | null>(null)

  // const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user
  //     setUser(user);
  //     console.log(getIdToken(user))
  //     // ...
  //   })
  //   .catch((error) => {
  //    // const errorCode = error.code;
  //     const errorMessage = error.message;
  //     setError(errorMessage)
  //     // ..
  //   });
  // }
  // console.log(user)
  // console.log(error)
  // console.log(auth.currentUser?.getIdTokenResult())
  // console.log(getIdToken(user))
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
    //     <div className="App">
    //       <h3>Login</h3>
    //      <form onSubmit={handleSignUp}>
    //       <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
    //       <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
    //       <button type='submit'>sign up</button>
    //      </form>
    //      <button onClick={async ()=>{
    // await console.log(auth.currentUser?.getIdTokenResult())
    //      }}>rer</button>
    //     </div>
  );
}

export default App;
