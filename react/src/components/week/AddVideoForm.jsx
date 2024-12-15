import { Form, Button, Select, Input, Checkbox } from "antd";

function AddVideoForm({ form, videoDetails, onFinish, onFinishFailed }) {
    return (
        <Form
            name="addVideoForm"
            layout="inline"
            form={form}
            initialValues={{
                showCamera: false,
                showSessionResult: false,
                
            }}
            onFinish={(data) => {
                onFinish(data);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
                label="Video"
                name="video"
                rules={[
                    {
                        required: true,
                        message: "Please Enter week",
                    },
                ]}>
                <Select
                    style={{ width: "500px" }}
                    options={videoDetails.map((item) => ({
                        value: `${item._id}^${item.title}`,
                        label: <span>{item.title}</span>,
                    }))}
                />
            </Form.Item>

            <Form.Item
                label="Order"
                name="order"
                rules={[
                    {
                        required: true,
                        message: "Please Enter order",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item name="showCamera" valuePropName="checked" label={null}>
                <Checkbox>showCamera</Checkbox>
            </Form.Item>

            <Form.Item name="showSessionResult" valuePropName="checked" label={null}>
                <Checkbox>showSessionResult</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add Video
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddVideoForm;
