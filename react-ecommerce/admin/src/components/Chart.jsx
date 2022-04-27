import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  padding: 20px 10px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;
const Title = styled.h3`
  margin-bottom: 20px;
`;

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data} width="100%">
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis />
          <Line type="monotone" dataKey={dataKey} stroke="#5550BD" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#E0DFDF" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
