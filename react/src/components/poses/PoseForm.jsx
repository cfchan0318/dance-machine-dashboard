import { Button, Form, Input,Upload } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';


function PoseForm({onFinish, onFinishFailed,form}) {
    const [fileList, setFileList] = useState([]);

    const props = {
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        },
        beforeUpload: (file) => {
          setFileList([...fileList, file]);
          return false;
        },
        fileList,
      };


    return (
        <Form
            name="basic"
            layout='horizontal'
            form={form}
            initialValues={{
                image:null
            }}
            onFinish={(data) => {
                onFinish(data)
                setFileList([])
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
                label="Pose"
                name="pose"
                rules={[
                    {
                        required: true,
                        message: "Please Enter pose label",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Image"
                name="image"
                rules={[
                    {
                        required: true,
                        message: "Please select file",
                    },
                ]}>
                <Upload {...props} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default PoseForm;
