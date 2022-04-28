import styled from "styled-components";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { format } from "timeago.js";

const Container = styled.div`
  flex: 3;
  padding: 20px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const TableHead = styled.thead``;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  font-weight: 600;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// const Image = styled.img`
//   width: 40px;
//   height: 40px;
//   object-fit: cover;
//   border-radius: 50%;
//   border: 0.5px solid lightgray;
//   margin-right: 12px;
// `;

const CustomerName = styled.span``;

const Button = styled.button`
  padding: 7px 10px;
  border: none;
  border-radius: 2px;
  min-width: 75px;
  font-weight: 600;
  margin: auto 0;
  cursor: pointer;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bg};
`;

const WidgetLarge = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const CreateButton = (type) => {
    switch (type) {
      case "Approved":
        return (
          <Button color="#3bb077" bg="#e5faf2">
            Approved
          </Button>
        );
      case "Pending":
        return (
          <Button color="#2a7ade" bg=" #ebf1fe">
            Pending
          </Button>
        );
      case "Declined":
        return (
          <Button color="#d95087" bg="#fff0f1">
            Declined
          </Button>
        );
      default:
        return;
    }
  };

  return (
    <Container>
      <Title>Latest transactions</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableData>
                <UserWrapper>
                  {/* <Image src="/images/Ayaka.jpg" alt="" /> */}
                  <CustomerName>{order.userId}</CustomerName>
                </UserWrapper>
              </TableData>
              <TableData>{format(order.createdAt)}</TableData>
              <TableData>$ {order.amount}</TableData>
              <TableData>{CreateButton(`${order.status}`)}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default WidgetLarge;
