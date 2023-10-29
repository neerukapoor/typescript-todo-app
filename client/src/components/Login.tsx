import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {
    return <>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"85vh"}}>
                <Card sx={{ display:"flex", flexDirection:"column", justifyContent:"center", minWidth: 375, minHeight: 255, alignItems:"center", padding:"20px" }}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <TextField style={{ width:"100%", marginBottom:"10px"}} id="outlined-basic" label="UserName" variant="outlined" />   
                        <TextField id="outlined-basic" label="Password " variant="outlined" />   
                        <Button style={{marginTop:"20px", marginBottom:"20px"}} variant="contained">Login</Button>
                    </div>
                    Don't have Account?
                    <Button variant="contained" href='/register'>Signup</Button>
                </Card>
                
        </div>
    </>
}

export default Login;