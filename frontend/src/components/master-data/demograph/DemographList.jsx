import { Button, Input, Layout, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import http from "../../../utils/http";
import AddDemograph from "./AddDemograph";
import DeleteUser from "../../system-administrator/user-management/DeleteUser";
import DetailUser from "../../system-administrator/user-management/DetailUser";

const { Text } = Typography;
const { Search } = Input;
const { Content } = Layout;

const DemographList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDetailUser, setOpenDetailUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openAddDemograph, setOpenAddDemograph] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
    },
  });

  const [search, setSearch] = useState("");

  const columns = [
    {
      title: <Text className="text-gray-500 font-normal">No</Text>,
      width: "7%",
      render: (text, record, index) =>
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
        index +
        1,
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
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
      defaultSortOrder: "descend",
    },
    {
      title: <Text className="text-gray-500 font-normal">Action</Text>,
      dataIndex: "",
      key: "x",
      width: "20%",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="bg-amber-400 hover:bg-amber-600 mr-1"
            onClick={() => handleDetail(record)}
          >
            Detail
          </Button>
          <Button type="primary" onClick={() => handleDeleteUser(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const fetchData = () => {
    setLoading(true);
    http
      .get("users")
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
      })
      .catch((error) => error.response);
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), openDeleteUser, openAddDemograph]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleDetail = (record) => {
    setSelectedUser(record);
    setOpenDetailUser(true);
  };

  const handleDeleteUser = (record) => {
    setSelectedUser(record);
    setOpenDeleteUser(true);
  };

  return (
    <>
      <Content className="p-6">
        <Text className="text-2xl font-normal">User</Text>
        <br />
        <div className="flex items-center justify-between w-full h-auto">
          <Search
            placeholder="Search User"
            className="mt-2 mb-2"
            style={{
              width: 250,
            }}
            onSearch={(value) => setSearch(value)}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            type="primary"
            className="rounded-xl focus:outline-none focus:shadow-outline items-center justify-center h-10 py-2 px-4 flex items-center"
            onClick={() => setOpenAddDemograph(true)}
          >
            <FiPlus className="mr-2" />
            Add User
          </Button>
        </div>
        <Table
          className="mt-3"
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          // size="middle"
          onRow={(record) => ({
            onClick: () => setSelectedUser(record),
          })}
        />
        <DetailUser
          open={openDetailUser}
          setOpen={setOpenDetailUser}
          userData={selectedUser}
          fetchData={fetchData}
        />
        <DeleteUser
          open={openDeleteUser}
          setOpen={setOpenDeleteUser}
          userData={selectedUser}
          fetchData={fetchData}
        />
        <AddDemograph open={openAddDemograph} setOpen={setOpenAddDemograph} />
      </Content>
    </>
  );
};

export default DemographList;
