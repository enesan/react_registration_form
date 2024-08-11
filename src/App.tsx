import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { AuthenticationForm } from "./Components/AuthenticationForm";

export default function App() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const isRegistered = localStorage.getItem('registered') === 'true';
    const username = localStorage.getItem('username');
    if (userData) {
      setUser(JSON.parse(userData));
      setRegistered(isRegistered);
    }
    setUsername(username)
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
            <h1>Welcome, {username}!</h1>
            <p>You are logged in as {username}</p>
            <button type="submit" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <p>You are logged in as {username}</p>
            <button type="submit" onClick={handleLogout}>Logout</button>
          </div>
        )
      ) : (
        <AuthenticationForm />
      )}
    </MantineProvider>
  );
}
