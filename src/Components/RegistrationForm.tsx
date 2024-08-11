import {useState} from 'react';
import {useForm} from '@mantine/form';
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
import {register} from "../web-client";

export function RegistrationForm(props: PaperProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            repeat_password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const validateRepeatPasswords = (e) => {
        form.setFieldValue('repeat_password', e.currentTarget.value)
        if (form.values.password !== form.values.repeat_password)
            form.errors["repeat_password"] = "Passwords mismatch"
    }

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        if (values.password === values.repeat_password)
            await registerUser(values);
        setLoading(false);
    };

    const registerUser = async (values: typeof form.values) => {
        const response = await register(values.email, values.password);
        localStorage.setItem('registered', JSON.stringify(response)["success"]); // 'true'
        localStorage.setItem('username', values.name);

        navigate('/registration/confirm')
        window.location.reload();
    };

    return (
        <Container size="xs" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>

            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    Welcome!
                </Text>

                <Divider labelPosition="center" my="lg"/>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
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

                        <PasswordInput
                            required
                            label="Repeat password"
                            placeholder="Repeat password"
                            value={form.values.repeat_password}
                            onChange={(e) =>validateRepeatPasswords(e)}
                            error={form.errors.repeat_password}
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => navigate('/auth')} size="xs">
                            Already have an account? Login
                        </Anchor>
                        <Button type="submit" radius="xl" loading={loading}>
                            Sign up
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}