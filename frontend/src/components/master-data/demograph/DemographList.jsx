import { Button, Input, Layout, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import http from "../../../utils/http";
import AddDemograph from "./AddDemograph";
import DeleteDemograph from "./DeleteDemograph"
import DetailDemograph from "./DetailDemograph";
import EditDemograph from "./EditDemograph";

const { Text } = Typography;
const { Search } = Input;
const { Content } = Layout;

const DemographList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDetailDemograph, setOpenDetailDemograph] = useState(false);
  const [selectedDemograph, setSelectedDemograph] = useState(null);
  const [openAddDemograph, setOpenAddDemograph] = useState(false);
  const [openDeleteDemograph, setOpenDeleteDemograph] = useState(false);
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
        return String(record.parametername)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
    },
    {
      title: <Text className="text-gray-500 font-normal">Parameter Name</Text>,
      dataIndex: "parameter_name",
      sorter: (a, b) => a.parameter_name.localeCompare(b.parameter_name),
    },
    {
      title: <Text className="text-gray-500 font-normal">Number of Options </Text>,
      dataIndex: "option_value",
      sorter: (a, b) => a.option_value.localeCompare(b.option_value),
      render: (optionValue) => (optionValue ? optionValue.length : 0),
    },
    {
      title: <Text className="text-gray-500 font-normal">Last Update</Text>,
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
          <Button type="primary" onClick={() => handleDeleteDemograph(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const fetchData = () => {
    setLoading(true);
    http
      .get("demograph")
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
  }, [JSON.stringify(tableParams), openDeleteDemograph, openAddDemograph]);

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
    setSelectedDemograph(record);
    setOpenDetailDemograph(true);
  };

  const handleDeleteDemograph = (record) => {
    setSelectedDemograph(record);
    setOpenDeleteDemograph(true);
  };

  return (
    <>
      <Content className="p-6">
        <Text className="text-2xl font-normal">Demograph</Text>
        <br />
        <div className="flex items-center justify-between w-full h-auto">
          <Search
            placeholder="Search Demograph"
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
            Add Demograph
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
            onClick: () => setSelectedDemograph(record),
          })}
        />
        <DetailDemograph
          open={openDetailDemograph}
          setOpen={setOpenDetailDemograph}
          demographData={selectedDemograph}
          fetchData={fetchData}
        />
        <DeleteDemograph
          open={openDeleteDemograph}
          setOpen={setOpenDeleteDemograph}
          demographData={selectedDemograph}
          fetchData={fetchData}
        />
        <AddDemograph open={openAddDemograph} setOpen={setOpenAddDemograph} />
      </Content>
    </>
  );
};

export default DemographList;
