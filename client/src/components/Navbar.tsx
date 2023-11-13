import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

interface NavBarProps {
    username: string,
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

const Navbar: React.FC<NavBarProps> = ({username, setUserName }) => {

    if(username !== "") {
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
                        {username}
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