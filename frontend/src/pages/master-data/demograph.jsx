import DashboardLayout from "../../layouts/Dashboard.layout";
import { Helmet } from "react-helmet";
import DemographList from "../../components/master-data/demograph/DemographList";

const Demograph = () => {
  return (
    <>
      <Helmet>
        <title>Demograph - MADAM Lite</title>
        <meta name="description" content="MADAM Lite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/star.svg" />
      </Helmet>
      <DashboardLayout>
        <DemographList />
      </DashboardLayout>
    </>
  );
};

export default Demograph;
