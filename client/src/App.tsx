import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Login from './components/Login';
import Register from './components/Register';


function App() {

  return (
    <>
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
