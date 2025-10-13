import { Space, Row, Col, Card, Form, Table } from "antd";
import VideoDetailsForm from "../../components/videoDetails/VideoDetailsForm";
import {
    createVideoDetails,
    fetchVideoDetailsList,
    deleteVideoDetails
} from "../../store/slices/videoDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { convertToAntdTable } from "../../utils/antdTable";
import { useNavigate } from 'react-router-dom';
import PageTitle from "../../components/common/PageTitle";

function VideoDetailsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [form] = Form.useForm();
    const videoDetailsList = useSelector(
        (state) => state.videoDetails.videoDetailsList
    );

    const create = async(data) => {
        await dispatch(createVideoDetails(data)).unwrap();
        dispatch(fetchVideoDetailsList())
    }

    const onFinish = (values) => {
        console.log(values);
        const data = {
            title: values.title,
            video_src: values.video_src,
            showCamera: values.showCamera,
        };
        create(data);
    };

    const onFinishFailed = (error) => {
        console.log(error);
    };

    const handleEditOnClick = (id) => {
        navigate(`/videoDetails/${id}`);
    }

    const handleDeleteOnClick = (id) => {
        dispatch(deleteVideoDetails(id))
        dispatch(fetchVideoDetailsList())
    }

    const customColumns = [
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => {
                        console.log('Edit', record._id)
                        handleEditOnClick(record._id)
                    }}>Edit</a>
                    {/* {<a onClick={() => handleDeleteOnClick(record._id)} style={{ marginLeft: 8 }}>Delete</a>} */}
                </span>
            )
        }
    ];
    
    const columnOrder = ['_id', 'title', 'action']; // Specify the desired order of columns
    

    const { dataSource, columns } = convertToAntdTable(
        videoDetailsList.items,
        [ "title","_id"],
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchVideoDetailsList());
    }, [dispatch]);

    return (
        <>
            <PageTitle>Video Details</PageTitle>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Add new Video">
                            <VideoDetailsForm
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Videos">
                            <Table
                                loading={videoDetailsList.isLoading}
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
}

export default VideoDetailsList;
