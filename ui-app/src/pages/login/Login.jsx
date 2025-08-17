import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {Card, CardContent, Button} from '@mui/material';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const userData = { name: "Rajib", role, token: "fake-jwt-token" };
    login(userData); // fake login
    navigate("/");
  };

  return (
    <div className="login-page">
      <Card sx={{ width: '25%', minWidth: '400px' }} variant="outlined">
        <CardContent>
          <h2>Login</h2>
          <p>Please select a role to login</p>
          <div className="login-buttons">
            <Button onClick={() => handleLogin("User")} variant="contained">Login as User</Button>
            <Button onClick={() => handleLogin("Admin")} variant="contained">Login as Admin</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
