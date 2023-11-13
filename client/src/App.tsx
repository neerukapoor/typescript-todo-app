import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';
import { useEffect, useState } from 'react';
import axios from "axios";
import { userState } from './store/atoms/user';
import {
  RecoilRoot,
  useSetRecoilState,
} from 'recoil';

function App() {
  return (
    <>
    <RecoilRoot>
        <Navbar/>
        <InitUser/>
        <Router>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/todo" element={<Todo/>}/>
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
    try {
      const response = await axios.get("http://localhost:3000/me", {
        headers: {
          "Content-type": "application/json",
          "jwtToken": "Bearer " + localStorage.getItem("jwtToken")    
        }
      })
      if(response.data.username.username) {
        setUser({
          isLoading:false,
          userName : response.data.username.username
        })
      } else {
        setUser({
          isLoading: false,
          userName: null
        })
      } 
    } catch(e) {
      setUser({
        isLoading: false,
        userName: null
      })
    }
  } 
  useEffect(() => {
    init();
  }, [])
  return <></>
}

export default App
