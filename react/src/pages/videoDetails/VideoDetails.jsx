import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Space, Card, Table, Button, Form, Alert } from "antd";
import { useEffect, useState } from "react";
import {
    fetchVideoDetailsById,
    fetchAllPose,
    addPoseChallenge,
    addVoiceChallenge,
    updateVideoDetails,
    deletePoseChallenge,
    deleteVoiceChallenge
} from "../../store/slices/videoDetailsSlice";
import { convertToAntdTable } from "../../utils/antdTable";
import PoseChallengeForm from "../../components/videoDetails/PoseChallengeForm";
import VoiceChallengeForm from "../../components/videoDetails/VoiceChallengeForm";

function VideoDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const videoDetails = useSelector(
        (state) => state.videoDetails.videoDetails
    );
    const poses = videoDetails.poses;

    const poseOptions = poses.map((pose) => ({
        value: pose.pose,
        label: <span>{pose.pose}</span>,
    }));

    useEffect(() => {
        dispatch(fetchAllPose());
        dispatch(fetchVideoDetailsById(id));
    }, [dispatch, id]);

    //PoseChallenges
    const pCustomColumns = [
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            console.log("Edit", record.timestamp);
                            dispatch(deletePoseChallenge(record.timestamp))
                        }}
                        style={{ marginLeft: 8 }}>
                        Delete
                    </a>
                </span>
            ),
        },
    ];
    const { dataSource, columns } = convertToAntdTable(
        videoDetails.data.poseChallenges,
        [],
        [],
        pCustomColumns,
        ["timestamp","pose","type","action"]
    );

    const handleOnFinish = (values) => {
        dispatch(addPoseChallenge(values));
    };

    //voiceChallenges
    const vCustomColumns = [
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            console.log("Edit", record.timestamp);
                            dispatch(deleteVoiceChallenge(record.timestamp))
                        }}
                        style={{ marginLeft: 8 }}>
                        Delete
                    </a>
                </span>
            ),
        },
    ];

    const { dataSource: vDataSource, columns: vColumns } = convertToAntdTable(
        videoDetails.data.voiceChallenges,
        [],
        [],
        vCustomColumns,
        ["timestamp","answer","action"]
    );

    const [form] = Form.useForm();
    const handleVoiceChallengeOnFinish = (data) => {
        data.answer = data.answer.split("");
        dispatch(addVoiceChallenge(data));
    };

    //save Details
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);
    const handleBtnSaveVideoDetails = () => {
        dispatch(updateVideoDetails({ id: id, data: videoDetails.data }));
        setIsSaveSuccess(true);
    };

    const handleOnClose = (e) => {
        setIsSaveSuccess(false);
        console.log(e, "closed");
    };

    return (
        <>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Video Info">
                            <div>
                                <span>
                                    <b>Title: </b>
                                    {videoDetails.data.title}
                                </span>
                            </div>
                            <div>
                                <span>
                                    <b>Video src: </b>
                                    {videoDetails.data.video_src}
                                </span>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Pose Challenges">
                            <PoseChallengeForm
                                poseOptions={poseOptions}
                                onFinish={(values) => {
                                    console.log(values);
                                    handleOnFinish(values);
                                }}
                            />
                            <Table dataSource={dataSource} columns={columns} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Voice Challenges">
                            <VoiceChallengeForm
                                form={form}
                                onFinish={handleVoiceChallengeOnFinish}
                            />
                            <Table
                                dataSource={vDataSource}
                                columns={vColumns}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={handleBtnSaveVideoDetails}>
                            Save Video Details
                        </Button>

                        {isSaveSuccess ? (
                            <Alert
                                message="Saved Successfully"
                                type="success"
                                closable
                                onClose={handleOnClose}
                            />
                        ) : (
                            ""
                        )}
                    </Col>
                </Row>
            </Space>
        </>
    );
}

export default VideoDetails;
