import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
// import { auth } from './config/firebase';
// import { createUserWithEmailAndPassword, User, getIdToken,  } from 'firebase/auth';
// import { useState } from 'react';
import Nav from "./components/Nav";

function App() {
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
