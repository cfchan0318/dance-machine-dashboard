import { Form, Input, Button, InputNumber, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function SongForm({ form, onFinish, onFinishFailed, clearOnClick, fileList, setFileList }) {
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = (file) => {
        // Prevent auto upload, we'll handle it manually
        return false;
    };

    return (
        <Form
            name="songForm"
            layout="inline"
            form={form}
            initialValues={{
                name: "",
                author: "",
                order: 0,
                publish: false,
                isLocked: false,
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
                        message: "Please enter song name",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Author"
                name="author"
                rules={[
                    {
                        required: true,
                        message: "Please enter author",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Order"
                name="order"
                rules={[
                    {
                        required: true,
                        message: "Please enter order",
                    },
                ]}>
                <InputNumber type="number" />
            </Form.Item>

            <Form.Item label="Publish" name="publish" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item label="Is Locked" name="isLocked" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item label="Photo" name="photo">
                <Upload
                    beforeUpload={beforeUpload}
                    onChange={handleUploadChange}
                    fileList={fileList}
                    maxCount={1}
                    accept="image/jpeg,image/png,image/webp"
                >
                    <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Form.Item label={null}>
                <Button onClick={clearOnClick}>Clear</Button>
            </Form.Item>
        </Form>
    );
}

export default SongForm;
