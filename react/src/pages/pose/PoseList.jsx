import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PoseForm from "../../components/poses/PoseForm";
import { fetchPose, createPose } from "../../store/slices/posesSlice";
import { Card, Row, Col, Space, Table } from "antd";
import { convertToAntdTable } from "../../utils/antdTable";

function PoseList() {
    const dispatch = useDispatch();
    const poseList = useSelector((state) => state.pose.items);

    const onFinish = (values) => {
        
        dispatch(createPose(values))
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    let columnConfigs = {
        json: {
            render: (text) => JSON.stringify(text),
        },
        image: {
            render: (text) => (
                <img height={320} width={240} src={`/api${text}`} />
            ),
        },
    };

    const { dataSource, columns } = convertToAntdTable(
        poseList,
        ["pose", "image", "json"],
        columnConfigs
    );

    useEffect(() => {
        dispatch(fetchPose());
    }, [dispatch]);

    return (
        <>
            <h1>Poses</h1>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Add new pose">
                            <PoseForm
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Poses">
                            <Table dataSource={dataSource} columns={columns} />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
}

export default PoseList;
