import { Form, Input, Button, Select } from "antd";
import { InputNumber } from "antd";

function UserForm({ form, onFinish, onFinishFailed, clearOnClick, userGroups = [] }) {
    return (
        <Form
            name="UserForm"
            layout="inline"
            form={form}
            initialValues={{
                name: "",
                code: "",
                userGroups: []
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
                    {
                        pattern: /^\d{6}$/,
                        message: "Login Code must be a 6-digit number",
                    },
                ]}>
                <Input
                    maxLength={6}
                    inputMode="numeric"
                    pattern="\d{6}"
                    placeholder="6-digit code"
                />
            </Form.Item>

            <Form.Item
                label="User Groups"
                name="userGroups">
                <Select
                    mode="multiple"
                    placeholder="Select user groups"
                    style={{ minWidth: 200 }}
                    options={userGroups.map(group => ({
                        label: group.name,
                        value: group._id
                    }))}
                />
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
