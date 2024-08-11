import { useState } from 'react';
import { useForm } from '@mantine/form';
import {login} from '../web-client'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container
} from '@mantine/core';
import {useNavigate} from "react-router-dom";

export function AuthenticationForm(props: PaperProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
      await loginUser(values);
    setLoading(false);
  };

  const loginUser = async (values: typeof form.values) => {
    const response = await login(values.email, values.password);
  //  localStorage.setItem('user', JSON.stringify({ email: values.email }));
    localStorage.setItem('user', JSON.stringify({ auth_token:  response["auth_token"],refresh_token: response["refresh_token"] }));
    localStorage.setItem('registered', 'true');

     window.location.href = response["continue_uri"]; // navigate('/');
  };

  return (
    <Container size="xs" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'}}>

      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'}}>
          Welcome!
        </Text>

        <Divider labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
           <TextInput
              required
              label="Email"
              placeholder="your@email.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => navigate('/registration')} size="xs">
                "Don't have an account? Register"
            </Anchor>
            <Button type="submit" radius="xl" loading={loading}>
              Log in
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}