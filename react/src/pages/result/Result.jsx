import { Space, Row, Col, Card, Spin, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResultById } from "../../store/slices/resultSlice";

import { useParams } from "react-router";
import { convertToAntdTable } from "../../utils/antdTable";

function Result() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const result = useSelector((state) => state.result.result);

    const customColumns = [
        {
            title: "answer",
            key: "answer",
            render: (text, record) => <span>{record.answer}</span>,
        },
        {
            title: "challenge",
            key: "challenge",
            render: (text, record) => <span>{record.challenge}</span>,
        },
        {
            title: "userAnswer",
            key: "userAnswer",
            render: (text, record) => <span>{record.userAnswer}</span>,
        },
        {
            title: "score",
            key: "score",
            render: (text, record) => <span>{record.score}</span>,
        },
    ];

    const columnOrder = [
        "timestamp",
        "type",
        "answer",
        "userAnswer",
        "score",
        "challenge",
        "upperLeftScore",
        "upperRightScore",
        "lowerLeftScore",
        "lowerRightScore",
        
    ]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        result.data?.result,
        columnOrder,
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchResultById(id));
    }, [dispatch, id]);

    return (
        <>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Result Info">
                            {result.isLoading ? (
                                <Spin />
                            ) : (
                                <>
                                    <div>
                                        <span>
                                            <b>Name: </b>
                                            {result.data.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <b>Date: </b>
                                            {result.data.date}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <b>Video Src: </b>
                                            {result.data.videoSrc}
                                        </span>
                                    </div>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="Videos">
                            <h2>Results</h2>
                            <Table
                                pagination={false}
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

export default Result;
