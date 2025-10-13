import React, { useEffect, useState } from "react";
import { Table, Space, Row, Col, Card, Select, Button } from "antd";
import PageTitle from "../../components/common/PageTitle";
import { fetchResultListing } from "../../store/slices/resultSlice";
import { fetchUserList } from "../../store/slices/usersSlice";
import { formatDateTime } from "../../utils/datetimeFormatter";
import { useSelector, useDispatch } from "react-redux";
import { antdTableSorter } from "../../utils/antdTable";
import { Link } from "react-router";

function ResultListing() {
    const dispatch = useDispatch();
    const resultListing = useSelector((state) => state.result.resultListing);
    const userList = useSelector((state) => state.user.UserList.items);

    const [userId, setUserId] = useState(null);
    const [csvExportIds, setCsvExportIds] = useState([]);

    useEffect(() => {
        dispatch(fetchResultListing({ userId: userId }));
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <PageTitle>Results</PageTitle>
            <Row className="mb-2">
                <Col span={16}>
                    <span>
                        <b>User : </b>
                        <Select
                            onChange={(val) => {
                                setUserId(val);
                                setCsvExportIds([]);
                            }}
                            style={{ width: "400px" }}
                            options={userList.map((row) => ({
                                value: row._id,
                                label: <span>{row.name}</span>,
                            }))}
                        />
                        <Button
                            onClick={() => {
                                dispatch(fetchResultListing({ userId: null }));
                            }}>
                            Clear
                        </Button>
                    </span>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    <Button onClick={() => console.log('asd')} >
                        {csvExportIds.length == 0
                            ? "Export all results"
                            : "Export Selected Results"}
                    </Button>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={24}>
                    <Table
                        rowSelection={{
                            align: "left",
                        }}
                        dataSource={resultListing.data}
                        columns={[
                            {
                                title: "User Name",
                                dataIndex: "userName",
                                key: "userName",
                                sorter: antdTableSorter("text", "userName"),
                                render: (val, record) => <Link to={`/results-by-user/${record['_id']}`}>{val}</Link>
                            },
                            {
                                title: "Last Update",
                                dataIndex: "latestDate",
                                key: "latestDate",
                                render: (val, item) => (
                                    <span>{formatDateTime(val)}</span>
                                ),
                                sorter: antdTableSorter("text", "latestDate"),
                            },
                            {
                                title: "Total Play Times",
                                dataIndex: "count",
                                key: "count",
                                sorter: antdTableSorter("number", "count"),
                            },
                        ]}
                    />
                </Col>
            </Row>
        </Space>
    );
}

export default ResultListing;
