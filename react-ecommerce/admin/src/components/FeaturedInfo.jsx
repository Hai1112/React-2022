import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FeaturedWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FeaturedItem = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;

const InfoContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const Money = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const MoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Compare = styled.span`
  font-size: 15px;
  color: gray;
  text-decoration: underline;
`;

const FeaturedInfo = () => {
  return (
    <Container>
      <FeaturedWrapper>
        <FeaturedItem>
          <Title>REVENUE</Title>
          <InfoContainer>
            <Money>$ 2,185</Money>
            <MoneyRate>
              - 11.4%
              <ArrowDownwardIcon sx={{ color: "red" }} />
            </MoneyRate>
          </InfoContainer>
          <Compare>Compare to last month</Compare>
        </FeaturedItem>

        <FeaturedItem>
          <Title>SALES</Title>
          <InfoContainer>
            <Money>$ 3,185</Money>
            <MoneyRate>
              - 8.4%
              <ArrowDownwardIcon sx={{ color: "red" }} />
            </MoneyRate>
          </InfoContainer>
          <Compare>Compare to last month</Compare>
        </FeaturedItem>

        <FeaturedItem>
          <Title>COST</Title>
          <InfoContainer>
            <Money>$ 2,485</Money>
            <MoneyRate>
              + 6.4%
              <ArrowUpwardIcon sx={{ color: "lightgreen" }} />
            </MoneyRate>
          </InfoContainer>
          <Compare>Compare to last month</Compare>
        </FeaturedItem>
      </FeaturedWrapper>
    </Container>
  );
};

export default FeaturedInfo;
