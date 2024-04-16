import { Button, Layout, Table, Typography, Tabs } from "antd";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import http from "../../../utils/http";
import AddPsychograph from "./AddPsychograph";
import DeletePsychograph from "./DeletePsychograph";
import EditPsychograph from "./EditPsychograph";

const { Text } = Typography;
const { Content } = Layout;

const PsychographList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPsychograph, setSelectedPsychograph] = useState(null);
  const [openEditPsychograph, setOpenEditPsychograph] = useState(false);
  const [openAddPsychograph, setOpenAddPsychograph] = useState(false);
  const [openDeletePsychograph, setOpenDeletePsychograph] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
    },
  });

  const columns = [
    {
      title: <Text className="text-gray-500 font-normal">No</Text>,
      key: "no",
      width: "7%",
      render: (text, record, index) =>
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
        index +
        1,
      onFilter: (value, record) => {
        return String(record.option_value)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
    },
    {
      title: <Text className="text-gray-500 font-normal">Option Name</Text>,
      key: "option_value",
      dataIndex: "option_value",
      sorter: (a, b) => a.option_value.localeCompare(b.option_value),
    },
    {
      title: <Text className="text-gray-500 font-normal">Last Update</Text>,
      key: "updated_at",
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
      key: "action",
      width: "20%",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="bg-amber-400 hover:bg-amber-600 mr-1"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => handleDeletePsychograph(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const fetchData = () => {
    setLoading(true);
    http
      .get("psychograph")
      .then((data) => {
        const mappedData = data.map((item) => {
          const foundItem = items.find(
            (i) => i.label.toLowerCase() === item.option_value.toLowerCase()
          );
          if (foundItem) {
            return { ...item, key: foundItem.key };
          }
          return item;
        });
        setData(mappedData);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: mappedData.length,
          },
        });
      })
      .catch((error) => error.response);
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), openDeletePsychograph, openAddPsychograph]);

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

  const handleEdit = (record) => {
    setSelectedPsychograph(record);
    setOpenEditPsychograph(true);
  };

  const handleDeletePsychograph = (record) => {
    setSelectedPsychograph(record);
    setOpenDeletePsychograph(true);
  };

  const handleTabChange = (key) => {
    console.log("Selected Tab:", key);
  };

  const items = [
    { key: "activity", label: "Activity", content: "Content of Activity Tab" },
    { key: "interest", label: "Interest", content: "Content of Interest Tab" },
    { key: "opinion", label: "Opinion", content: "Content of Opinion Tab" },
  ];

  return (
    <Content className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Text className="text-2xl font-normal">Psychograph</Text>
        <Button
          type="primary"
          className="rounded-xl focus:outline-none focus:shadow-outline items-center justify-center h-10 py-2 px-4 flex items-center"
          onClick={() => setOpenAddPsychograph(true)}
        >
          <FiPlus className="mr-2" />
          Add Option
        </Button>
      </div>

      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />

      <Table
        className="mt-3"
        columns={columns}
        rowKey={(record) => record.psychograph_id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        // size="middle"
        onRow={(record) => ({
          onClick: () => setSelectedPsychograph(record),
        })}
      />

      <EditPsychograph
        open={openEditPsychograph}
        setOpen={setOpenEditPsychograph}
        psychographData={selectedPsychograph}
        fetchData={fetchData}
      />
      <DeletePsychograph
        open={openDeletePsychograph}
        setOpen={setOpenDeletePsychograph}
        psychographData={selectedPsychograph}
        fetchData={fetchData}
      />
      <AddPsychograph
        open={openAddPsychograph}
        setOpen={setOpenAddPsychograph}
      />
    </Content>
  );
};

export default PsychographList;
