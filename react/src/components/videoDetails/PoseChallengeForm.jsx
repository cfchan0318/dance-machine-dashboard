import { Form, Button, Select } from "antd";
import { MaskedInput } from "antd-mask-input";

function PoseChallengeForm({ form, poseOptions, onFinish, onFinishFailed }) {
    return (
        <Form
            name="poseChallengeForm"
            layout="horizontal"
            form={form}
            initialValues={{
                timestamp: "",
                answer: "",
                type: null,
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
                        message: "Please Enter timestamp",
                    },
                ]}>
                <MaskedInput mask={"00:00:00.000"} />
            </Form.Item>

            <Form.Item
                label="Pose"
                name="pose"
                rules={[
                    {
                        required: true,
                        message: "Please Enter title",
                    },
                ]}>
                <Select options={poseOptions} />
            </Form.Item>

            <Form.Item
                label="Type"
                name="type"
                rules={[
                    {
                        required: true,
                        message: "Please Enter src",
                    },
                ]}>
                <Select options={[
                    { value: 'posture', label: <span>{'posture'}</span> },
                    { value: 'clock-3', label: <span>{'clock-3'}</span> },
                    { value: 'clock-9', label: <span>{'clock-9'}</span> },
                    { value: 'clock-12', label: <span>{'clock-12'}</span> }
                    
                ]} />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
}

export default PoseChallengeForm;
