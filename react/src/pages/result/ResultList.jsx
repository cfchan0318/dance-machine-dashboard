import { Row, Col, Space, Card, Table, Button, Checkbox, Select } from "antd";
import { fetchResultList } from "../../store/slices/resultSlice";
import { fetchUserList } from "../../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CSVLink } from "react-csv";
import axios from "axios";
import { saveAs } from "file-saver";

const ResultList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resultList = useSelector((state) => state.result.resultList);
    const userList = useSelector((state) => state.user.UserList.items);
    const [csvExportIds, setCsvExportIds] = useState([]);

    const handleViewOnClick = (id) => {
        navigate(`/results/${id}`);
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
        resultList.items,
        ["select", "_id", "name", "date", "title", "videoSrc", "action"],
        {},
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchUserList());
        dispatch(fetchResultList());
    }, [dispatch]);

    return (
        <>
            <h1>Game Results</h1>
            <Space direction="vertical" style={{ display: "flex" }}>
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
                                    <span>
                                        <b>User : </b>
                                        <Select
                                            onChange={(val) => {
                                                dispatch(fetchResultList(val));
                                                setCsvExportIds([]);
                                            }}
                                            style={{ width: "400px" }}
                                            options={userList.map((row) => ({
                                                value: row._id,
                                                label: <span>{row.name}</span>,
                                            }))}
                                        />
                                        <Button onClick={() =>{dispatch(fetchResultList())}}>Clear</Button>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Table
                                        pagination={false}
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

export default ResultList;
