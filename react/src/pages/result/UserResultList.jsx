import {
    Row,
    Col,
    Space,
    Card,
    Table,
    Button,
    Checkbox,
    Select,
    Breadcrumb,
} from "antd";
import { fetchResultList } from "../../store/slices/resultSlice";
import { fetchUserList, fetchUserById } from "../../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CSVLink } from "react-csv";
import axios from "axios";
import { saveAs } from "file-saver";

const UserResultList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const resultList = useSelector((state) => state.result.resultList);
    const user = useSelector((state) => state.user.User);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChanger: true, // Enable pageSize selection
        pageSizeOptions: ["5", "10", "20", "50"], // Available page sizes
    });
    const [total, setTotal] = useState(0);

    const [csvExportIds, setCsvExportIds] = useState([]);

    useEffect(() => {
        dispatch(fetchUserById(params.id));
        dispatch(fetchResultList({ userId: params.id }));
    }, [dispatch, params.id]);

    useEffect(() => {
        dispatch(fetchResultList({ userId: params.id, pagination }));
    }, [dispatch, params.id, pagination]);

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    const handleViewOnClick = (id) => {
        navigate(`/results/${id}`);
    };

    const onPaginationChange = (pagination) => {
        setPagination({
            ...pagination,
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    const exportCsv = async () => {
        let ids = csvExportIds;

        if (csvExportIds.length == 0) {
            ids = resultList.items.map((row) => row._id);
        }

        try {
            const response = await axios.post(
                "/api/result/export-csv",
                { resultIds: ids },
                {
                    responseType: "blob", // Important for binary data
                }
            );

            // Use FileSaver.js to save the file
            const blob = new Blob([response.data], { type: "application/zip" });
            saveAs(blob, "results.zip"); // Specify the file name
            setCsvExportIds([]);
        } catch (error) {
            console.error("Error downloading the file", error);
        }
    };

    const handleCheckboxOnChange = (e, id) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setCsvExportIds([...csvExportIds, id]);
        } else {
            setCsvExportIds(csvExportIds.filter((i) => i !== id));
        }
    };

    const customColumns = [
        {
            title: "Select for export",
            key: "select",
            render: (text, record) => (
                <span>
                    <Checkbox
                        checked={
                            csvExportIds.includes(record._id) ? true : false
                        }
                        onChange={(e) => handleCheckboxOnChange(e, record._id)}
                    />
                </span>
            ),
        },
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
        {
            title: "Export",
            key: "export",
            render: (text, record) => {
                return (
                    <span>
                        <CSVLink
                            data={record.result}
                            filename={`${record.date}-${record.name}_${record.title}.csv`}>
                            Download
                        </CSVLink>
                    </span>
                );
            },
        },
    ];

    const columnOrder = [
        "select",
        "_id",
        "name",
        "date",
        "title",
        "videoSrc",
        "action",
    ]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        resultList && resultList.items ? resultList.items : [],
        ["select", "_id", "name", "date", "title", "videoSrc", "action"],
        {},
        customColumns,
        columnOrder
    );

    useEffect(() => {
        console.log("totoal count", resultList.total);
        if (
            resultList &&
            typeof resultList.total === "number" &&
            total !== resultList.total
        ) {
            setTotal(resultList.total);
        }
    }, [resultList, total]);

    return (
        <>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Breadcrumb
                    items={[
                        {
                            title: "Results",
                        },
                        {
                            title: user.data.name,
                        },
                    ]}
                />
                <Row justify="end">
                    <Col span={24}>
                        <Button onClick={() => exportCsv()}>
                            {csvExportIds.length == 0
                                ? "Export all results"
                                : "Export Selected Results"}
                        </Button>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Results">
                            <Row>
                                <Col span={24}>
                                    <Table
                                        onChange={onPaginationChange}
                                        pagination={{
                                            ...pagination,
                                            total: total,
                                        }}
                                        dataSource={dataSource}
                                        columns={columns}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default UserResultList;
