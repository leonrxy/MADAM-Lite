import { Button, Layout, Tabs, Typography } from "antd";
import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import AddPsychograph from "./AddPsychograph";
import ActivityList from "./ActivityList";
import InterestList from "./InterestList";
import OpinionList from "./OpinionList";
import http from "../../../utils/http";

const { Text } = Typography;
const { Content } = Layout;

const PsychographIndex = () => {
  const [openAddPsychograph, setOpenAddPsychograph] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
    },
  });

  const [activityData, setActivityData] = useState([]);
  const [interestData, setInterestData] = useState([]);
  const [opinionData, setOpinionData] = useState([]);

  const fetchData = (type) => {
    setLoading(true);
    http
      .get(`psychograph/type/${type}`)
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

        switch (type) {
          case "activity":
            setActivityData(mappedData);
            break;
          case "interest":
            setInterestData(mappedData);
            break;
          case "opinion":
            setOpinionData(mappedData);
            break;
          default:
            break;
        }

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
    fetchData("activity");
    fetchData("interest");
    fetchData("opinion");
  }, [JSON.stringify(tableParams)]);

  const items = [
    {
      key: "activity",
      label: "Activity",
      children: (
        <ActivityList
          data={activityData}
          setData={setActivityData}
          loading={loading}
          tableParams={tableParams}
          setTableParams={setTableParams}
          fetchData={fetchData}
        />
      ),
    },
    {
      key: "interest",
      label: "Interest",
      children: (
        <InterestList
          data={interestData}
          setData={setInterestData}
          loading={loading}
          tableParams={tableParams}
          setTableParams={setTableParams}
          fetchData={fetchData}
        />
      ),
    },
    {
      key: "opinion",
      label: "Opinion",
      children: (
        <OpinionList
          data={opinionData}
          setData={setOpinionData}
          loading={loading}
          tableParams={tableParams}
          setTableParams={setTableParams}
          fetchData={fetchData}
        />
      ),
    },
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
          <FiPlus className="mr-2" /> Add Option
        </Button>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
      <AddPsychograph
        open={openAddPsychograph}
        setOpen={setOpenAddPsychograph}
        fetchData={fetchData}
      />
    </Content>
  );
};

export default PsychographIndex;