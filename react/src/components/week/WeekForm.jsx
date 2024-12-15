import { Form, Input, Button } from "antd";

function WeekForm({ form, onFinish, onFinishFailed }) {
    return (
        <Form
            name="weekForm"
            layout="inline"
            form={form}
            initialValues={{
                week: "",
                name: "",
            }}
            onFinish={(data) => {
                onFinish(data);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            
            
            <Form.Item
                label="Week"
                name="week"
                rules={[
                    {
                        required: true,
                        message: "Please Enter week",
                    },
                ]}>
                <Input />
            </Form.Item>

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

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default WeekForm;
