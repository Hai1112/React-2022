import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

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
  const [income, setIncome] = useState();
  const [percent, setPercent] = useState();

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setIncome(res.data);
        setPercent((res.data[1].total / res.data[0].total) * 100 - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, []);

  console.log(percent);

  return (
    <Container>
      <FeaturedWrapper>
        <FeaturedItem>
          <Title>REVENUE</Title>
          <InfoContainer>
            <Money>$ {income?.[1].total}</Money>
            {percent < 0 ? (
              <MoneyRate>
                {Math.floor(percent)}%
                <ArrowDownwardIcon sx={{ color: "red" }} />
              </MoneyRate>
            ) : (
              <MoneyRate>
                + {Math.floor(percent)}%
                <ArrowUpwardIcon sx={{ color: "lightgreen" }} />
              </MoneyRate>
            )}
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
