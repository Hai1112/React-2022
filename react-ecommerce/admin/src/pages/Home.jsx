import styled from "styled-components";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import WidgetLarge from "../components/WidgetLarge";
import WidgetSmall from "../components/WidgetSmall";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../requestMethods";

const Container = styled.div``;

const Bottom = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 5;
  padding: 20px;
`;

const ChartContainer = styled.div`
  padding: 20px;
`;

const WidgetContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: Months[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [Months, setUserStats]);
  return (
    <Container>
      <TopBar />
      <Bottom>
        <Sidebar />
        <Main>
          <FeaturedInfo />
          <ChartContainer>
            <Chart
              data={userStats}
              title="User Analytics"
              grid
              dataKey="Active User"
            />
          </ChartContainer>
          <WidgetContainer>
            <WidgetSmall />
            <WidgetLarge />
          </WidgetContainer>
        </Main>
      </Bottom>
    </Container>
  );
};

export default Home;
