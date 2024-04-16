import { Button, Table, Typography } from "antd";
import { useState } from "react";
import DeletePsychograph from "./DeletePsychograph";
import EditPsychograph from "./EditPsychograph";

const { Text } = Typography;

const InterestList = ({ data, setData, loading, tableParams, setTableParams, fetchData  }) => {
  const [selectedPsychograph, setSelectedPsychograph] = useState(null);
  const [openEditPsychograph, setOpenEditPsychograph] = useState(false);
  const [openDeletePsychograph, setOpenDeletePsychograph] = useState(false);

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

  return (
    <div>
      <Table
        className="mt-3"
        columns={columns}
        rowKey={(record) => record.psychograph_id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => setSelectedPsychograph(record),
        })}
      />
      <EditPsychograph
        open={openEditPsychograph}
        setOpen={setOpenEditPsychograph}
        psychographData={selectedPsychograph}
        fetchData={() => fetchData("interest")}
      />
      <DeletePsychograph
        open={openDeletePsychograph}
        setOpen={setOpenDeletePsychograph}
        psychographData={selectedPsychograph}
        fetchData={() => fetchData("interest")}
      />
    </div>
  );
};

export default InterestList;