import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userSignup = () => {
        fetch('http://localhost:3000/auth/signup', {
            method:"POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res)=>{
            return res.json()
        }).then((data) => {
            localStorage.setItem("jwtToken", data.jwtToken)
            navigate('/todo');
        })
    }

    return <>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"85vh"}}>
            <Card sx={{ display:"flex", flexDirection:"column", justifyContent:"center", minWidth: 375, minHeight: 255, alignItems:"center", padding:"20px" }}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <TextField style={{ width:"100%", marginBottom:"10px"}} id="outlined-basic" label="UserName" variant="outlined" onChange={(e) => setUserName(e.target.value)} />   
                    <TextField id="outlined-basic" label="Password " variant="outlined" onChange={(e) => setPassword(e.target.value)} />   
                    <Button style={{marginTop:"20px", marginBottom:"20px"}} variant="contained" onClick={userSignup}>Signup</Button>
                </div>
                Already have an Account?
                <Button variant="contained" href='/login'>Login</Button>
            </Card>
        </div>
    </>
}

export default Register;