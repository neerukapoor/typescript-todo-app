import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import {useEffect, useState} from 'react';

function Navbar() {

    const [user, setUserName] = useState('');

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

    if(user !== "") {
        return <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <a href="/todo" style={{textDecoration:"none", color:"white"}}>TODO</a>
                    </Typography>
                    <div>
                        {user}
                    </div>
                    <Button color="inherit" href='/login' onClick={() => {localStorage.setItem("jwtToken", '')} }>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    }
     
    return <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <a href="/" style={{textDecoration:"none", color:"white"}}>TODO</a>
            </Typography>
            <Button color="inherit" href='/login'>Login</Button>
            <Button color="inherit" href='/register'>Signup</Button>
            </Toolbar>
        </AppBar>
      </Box>
    </>
}

export default Navbar;