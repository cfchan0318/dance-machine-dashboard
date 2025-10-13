import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PoseForm from "../../components/poses/PoseForm";
import { fetchPose, createPose,removePose } from "../../store/slices/posesSlice";
import { Card, Row, Col, Space, Table,Form, Button } from "antd";
import { convertToAntdTable } from "../../utils/antdTable";
import PageTitle from '../../components/common/PageTitle';

function PoseList() {
    const dispatch = useDispatch();
    const poseList = useSelector((state) => state.pose.items);
    const loading = useSelector(state => state.pose.loading);
    const [form] = Form.useForm()

    const handleOnFinish = async (values) => {
        await dispatch(createPose(values)).unwrap();
        dispatch(fetchPose());
    }

    const onFinish = (values) => {
        handleOnFinish(values);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    let columnConfigs = {
        json: {
            render: (text) => <p><code>{JSON.stringify(text)}</code></p>,
        },
        image: {
            render: (text) => (
                <img height={320} width={240} src={`/api/${text}`} />
            ),
        },
        // _id: {
        //     render: (text) => (
        //         <Button type="primary" onClick={() => {
        //             dispatch(removePose(text))
        //         }}>Remove</Button>
        //     )
        // }
    };

    const { dataSource, columns } = convertToAntdTable(
        poseList,
        ["pose", "image", "json","_id"],
        columnConfigs
    );

    useEffect(() => {
        dispatch(fetchPose());
    }, [dispatch]);

    return (
        <>
            <PageTitle>Poses</PageTitle>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Add new pose">
                            <PoseForm
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Poses">
                            <Table
                                loading={loading}
                                dataSource={dataSource}
                                columns={columns} />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
}

export default PoseList;
