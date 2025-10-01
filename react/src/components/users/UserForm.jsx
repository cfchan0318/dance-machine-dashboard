import { Form, Input, Button } from "antd";

function UserForm({ form, onFinish, onFinishFailed, clearOnClick }) {
    return (
        <Form
            name="UserForm"
            layout="inline"
            form={form}
            initialValues={{
                name: "",
            }}
            onFinish={(data) => {
                onFinish(data);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please Enter name",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Login Code"
                name="code"
                rules={[
                    {
                        required: true,
                        message: "Please Enter Login Code",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Form.Item label={null}>
                <Button onClick={() => clearOnClick()}>Clear</Button>
            </Form.Item>
        </Form>
    );
}

export default UserForm;
