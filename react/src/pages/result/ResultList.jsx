import { Row, Col, Space, Card, Table } from "antd";
import { fetchResultList} from "../../store/slices/resultSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ResultList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resultList = useSelector((state) => state.result.resultList);

    const handleViewOnClick = (id) => {
        navigate(`/result/${id}`);
    };


    const customColumns = [
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            console.log("View", record._id);
                            handleViewOnClick(record._id);
                        }}>
                        View
                    </a>
                </span>
            ),
        },
    ];

    const columnOrder = ["_id", "name", "date", "videoSrc", "action"]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        resultList.items,
        ["_id", "name", "date", "videoSrc", "action"],
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchResultList());
    }, [dispatch]);

    return (
        <>
            <h1>Game Results</h1>
            <Space direction="vertical" style={{ display: "flex" }}>
               
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Results">
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
};

export default ResultList;
