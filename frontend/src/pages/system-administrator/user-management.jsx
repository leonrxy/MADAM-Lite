import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/Dashboard.layout";
import { Button, Layout, Typography, Table } from "antd";

const { Text } = Typography;

const { Content } = Layout;

const UserManagement = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });

  const columns = [
    {
      title: <Text className="text-gray-500 font-normal">No</Text>,
      width: "5%",
      render: (text, record, index) =>
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
        index +
        1,
    },
    {
      title: <Text className="text-gray-500 font-normal">Name</Text>,
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <Text className="text-gray-500 font-normal">Username</Text>,
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: <Text className="text-gray-500 font-normal">Updated at</Text>,
      dataIndex: "updated_at",
      sorter: (a, b) => a.updated_at.localeCompare(b.updated_at),
      render: (text) => {
        const date = new Date(text);
        return `${
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        }/${
          date.getMonth() < 9
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1
        }/${date.getFullYear()}`;
      },
      width: "20%",
    },
    {
      title: <Text className="text-gray-500 font-normal">Action</Text>,
      dataIndex: "",
      key: "x",
      width: "20%",
      render: () => (
        <>
          <Button type="primary" className="bg-amber-400 mr-1">
            Detail
          </Button>
          <Button type="primary">Delete</Button>
        </>
      ),
    },
  ];

  const fetchData = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:3000/api/users`, {
      method: "GET", // Menambahkan metode HTTP GET
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${yourAccessToken}`, // Menambahkan header Authorization dengan token bearer
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.length,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <DashboardLayout>
      <Content className="p-6">
        <Text className="text-2xl font-semibold">User</Text>
        <Table
          columns={columns}
          rowKey={(record) => record.user_id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          size="middle"
        />
      </Content>
    </DashboardLayout>
  );
};

export default UserManagement;
