import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { AuthenticationForm } from "./Components/AuthenticationForm";

 export default function App() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);


  useEffect(() => {
    const userData = localStorage.getItem('user');
    const isRegistered = localStorage.getItem('registered') === 'true';
    if (userData) {
      setUser(JSON.parse(userData));
      setRegistered(isRegistered);
    }
  }, []);

  const handlerLogout = () => {
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
        <h1>Welcome, {user.name ? user.name : `${user.name}`}!</h1>
        <p>You are logged in as {user.email}</p>
        <button type="submit" onClick={handlerLogout}>Logout</button>
      </div> 
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <p>You are logged in as {user.email}</p>
        <button type="submit" onClick={handlerLogout}>Logout</button>
      </div>
    )
  ) : (
        <AuthenticationForm />
  )}
      
  </MantineProvider>
  )
   
}
