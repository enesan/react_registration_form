import {useState} from 'react';
import {useForm} from '@mantine/form';
import {
    TextInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Stack,
    Container,
} from '@mantine/core';
import {useNavigate, useNavigation} from "react-router-dom";
import {confirmRegistration} from "../web-client";

export function CodeConfirmationForm(props: PaperProps) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let codeFromResponse;
    const form = useForm({
        initialValues: {
            code: ''
        },
        validate: {
            code: (val) => (/\d{6}/.test(val) ? null : 'Invalid code'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        await confirmCode({code: values.code});
        setLoading(false);
    };

    const confirmCode = async (values: typeof form.values) => {
        const response = await confirmRegistration(values.code);

        if(response["success"])
            navigate("/");
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
                    Confirm Code
                </Text>

                <Divider labelPosition="center" my="lg"/>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <Text>
                            The code was sent to your email
                        </Text>
                            <TextInput
                                label="Code"
                                placeholder="Enter code"
                                value={form.values.code}
                                onChange={(event) => form.setFieldValue('code', event.currentTarget.value)}
                                radius="md"
                                required
                            />
                    </Stack>
                    <Group justify="space-between" mt="xl">
                        <Button type="submit" radius="xl" loading={loading}>
                            Submit
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}