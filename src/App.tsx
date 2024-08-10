import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { AuthenticationForm } from "./Components/AuthenticationForm";
import {useNavigate} from "react-router-dom";

export default function App() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const isRegistered = localStorage.getItem('registered') === 'true';

     if(user && !isRegistered) {
       navigate('/registration/confirm')
     }
    
    if (userData) {
      setUser(JSON.parse(userData));
      setRegistered(isRegistered);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('registered');
    setUser(null);
    setRegistered(false);
  };

  return (
    <MantineProvider>
      {user ? (
        registered ? (
          <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Welcome, {user.name ? user.name : 'User'}!</h1>
            <p>You are logged in as {user.email}</p>
            <button type="submit" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <p>You are logged in as {user.email}</p>
            <button type="submit" onClick={handleLogout}>Logout</button>
          </div>
        )
      ) : (
        <AuthenticationForm />
      )}
    </MantineProvider>
  );
}
