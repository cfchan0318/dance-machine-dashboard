import { Form, Input, Button, Checkbox } from "antd";

function VideoDetailsForm({ onFinish, onFinishFailed, form }) {
    return (
        <Form
            name="basic"
            layout="horizontal"
            form={form}
            initialValues={{
                title: "",
            }}
            onFinish={(data) => {
                onFinish(data);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: "Please Enter title",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Video Source URL"
                name="video_src"
                rules={[
                    {
                        required: true,
                        message: "Please Enter src",
                    },
                ]}>
                <Input />
            </Form.Item>

           
            <Form.Item name="showCamera" valuePropName="checked" label={null}>
                <Checkbox>Show Camera?</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default VideoDetailsForm;
