import { Badge, Button, Layout, Tabs, Typography } from "antd";
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
  const [activeTab, setActiveTab] = useState("activity");
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
        switch (type) {
          case "activity":
            setActivityData(data);
            break;
          case "interest":
            setInterestData(data);
            break;
          case "opinion":
            setOpinionData(data);
            break;
          default:
            break;
        }

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
    fetchData("activity");
    fetchData("interest");
    fetchData("opinion");
  }, [JSON.stringify(tableParams)]);

  const items = [
    {
      key: "activity",
      label: (
        <div className="flex items-center">
          Activity
          <Badge
            count={activityData.length}
            showZero
            color={activeTab === "activity" ? "#F8D0CE" : "#F2F2F2"}
            style={{
              color: activeTab === "activity" ? "#DC362E" : "#929EAE",
              marginLeft: 5,
              borderRadius: 6,
            }}
          />
        </div>
      ),
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
      label: (
        <div className="flex items-center">
          Interest
          <Badge
            count={interestData.length}
            showZero
            color={activeTab === "interest" ? "#F8D0CE" : "#F2F2F2"}
            style={{
              color: activeTab === "interest" ? "#DC362E" : "#929EAE",
              marginLeft: 5,
              borderRadius: 6,
            }}
          />
        </div>
      ),
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
      label: (
        <div className="flex items-center">
          Opinion
          <Badge
            count={opinionData.length}
            showZero
            color={activeTab === "opinion" ? "#F8D0CE" : "#F2F2F2"}
            style={{
              color: activeTab === "opinion" ? "#DC362E" : "#929EAE",
              marginLeft: 5,
              borderRadius: 6,
            }}
          />
        </div>
      ),
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

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

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
      <Tabs
        defaultActiveKey="activity"
        items={items}
        tabBarStyle={{
          background: "#F8F8F8",
          paddingLeft: 20,
          borderRadius: 12,
        }}
        onChange={handleTabChange}
      />
      <AddPsychograph
        open={openAddPsychograph}
        setOpen={setOpenAddPsychograph}
        fetchData={fetchData}
      />
    </Content>
  );
};

export default PsychographIndex;
