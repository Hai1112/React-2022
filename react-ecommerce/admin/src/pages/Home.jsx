import styled from "styled-components";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import WidgetLarge from "../components/WidgetLarge";
import WidgetSmall from "../components/WidgetSmall";
import { userData } from "../DATA";

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
  return (
    <Container>
      <TopBar />
      <Bottom>
        <Sidebar />
        <Main>
          <FeaturedInfo />
          <ChartContainer>
            <Chart
              data={userData}
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
