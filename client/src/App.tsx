import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUserName] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/me", {
        method:"GET",
        headers: {
            "Content-type": "application/json",
            "jwtToken": "Bearer " + localStorage.getItem("jwtToken")    
        }
      }).then((res)=>{
          return res.json()
      }).then((data) => {
          setUserName(data.username.username)
      })
  }, [])
  console.log("skaxv,mndxcv")
  console.log(username)
  return (
    <>
      <Navbar username={username} setUserName={setUserName}/>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/todo" element={<Todo/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
