import React from "react";
import { Form, Input, Button } from "antd";

const GameLevelForm = ({ form, onFinish, onFinishFailed }) => {
    return (
        <Form
            name="addVideoForm"
            layout="inline"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please Enter name",
                    },
                ]}>
                <Input name="name" />
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add Level
                </Button>
            </Form.Item>
        </Form>
    );
};

export default GameLevelForm;
