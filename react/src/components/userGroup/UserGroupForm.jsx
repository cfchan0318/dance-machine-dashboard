import { Form, Input, Button } from "antd";

const { TextArea } = Input;

function UserGroupForm({ form, onFinish, onFinishFailed, clearOnClick }) {
    return (
        <Form
            name="UserGroupForm"
            layout="vertical"
            form={form}
            initialValues={{
                name: "",
                description: ""
            }}
            onFinish={(data) => {
                onFinish(data);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
                label="Group Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please Enter group name",
                    },
                ]}>
                <Input placeholder="Enter group name" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description">
                <TextArea 
                    rows={4}
                    placeholder="Enter group description (optional)"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    Submit
                </Button>
                <Button onClick={() => clearOnClick()}>Clear</Button>
            </Form.Item>
        </Form>
    );
}

export default UserGroupForm;
