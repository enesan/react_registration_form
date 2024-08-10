import { useState } from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {login, register, confirmRegistration} from '../web-client'
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

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },


    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    if (type === 'register') {
      await registerUser(values);
    } else {
      await loginUser(values);
    }
    setLoading(false);
  };

  const registerUser = async (values: typeof form.values) => {
    const response = await register(values.email, values.password);
    localStorage.setItem('user', JSON.stringify({ email: values.email, name: values.name }));
    localStorage.setItem('registered', values["success"]);
    window.location.reload();
  };

  const loginUser = async (values: typeof form.values) => {
    const response = await login(values.email, values.password);
    localStorage.setItem('user', JSON.stringify({ email: values.email, name: values.name }));
    localStorage.setItem('registered', 'false');
    localStorage.setItem('auth_token', response["auth_token"]);
    localStorage.setItem('refresh_token', response["refresh_token"]);
    window.location.href = response["continue_uri"];
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
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

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

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={loading}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}