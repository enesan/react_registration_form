import {useState} from 'react';
import {useToggle, upperFirst} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {login, register, confirmRegistration} from '../web-client'
import {
    TextInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Stack,
    Container
} from '@mantine/core';
import {Anchor} from "@mantine/core/lib";
import {useNavigate, useNavigation} from "react-router-dom";

export function CodeConfirmationForm(props: PaperProps) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let codeFromResponse;
    const form = useForm({
        initialValues: {
            code: ''
        },
        validate: {
            code: (val) => ( val.length < 7 ? null : 'Invalid code'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        await confirmCode({code: values.code});
        setLoading(false);
    };

    const confirmCode = async (values: typeof form.values) => {
        const response = await confirmRegistration(values.code);
        if(values.code === response["code"])
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
                            <TextInput
                                label="Code"
                                placeholder="Confirmation code"
                                value={form.values.code}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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