import { Form, Input, Button } from "antd";
import { MaskedInput } from "antd-mask-input";

function VoiceChallengeForm({ form, onFinish, onFinishFailed }) {
    return (
        <Form
            name="voiceChallengeForm"
            layout="inline"
            form={form}
            initialValues={{
                timestamp: "",
                answer: "",
            }}
            onFinish={(data) => {
                onFinish(data);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            
            <Form.Item
                label="Timestamp"
                name="timestamp"
                rules={[
                    {
                        required: true,
                        message: "Please Enter title",
                    },
                ]}>
                <MaskedInput mask={"00:00:00.000"} />
            </Form.Item>

            <Form.Item
                label="Answer"
                name="answer"
                rules={[
                    {
                        required: true,
                        message: "Please Enter answer",
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

export default VoiceChallengeForm;
