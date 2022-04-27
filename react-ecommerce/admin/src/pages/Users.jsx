import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../DATA";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Bottom = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 5;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 40px;
`;

const DataGridContainer = styled.div`
  height: 60vh;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
`;

const ActionContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 4px 10px;
  min-width: 55px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bg};
  border-radius: 2px;
  font-weight: 500;
  border: none;
  outline: none;
  cursor: pointer;
  &:first-child {
    margin-right: 10px;
  }
`;

const Users = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserContainer>
            <Image src={params.row.avatar} alt="" />
            {params.row.username}
          </UserContainer>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "transaction", headerName: "Transaction Volume", width: 160 },
    {
      filed: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <ActionContainer>
            <Link to={`/user/${params.row.id}`}>
              <Button color="white" bg="#3bb077">
                Edit
              </Button>
            </Link>
            <Button
              color="red"
              bg="#f9dbdd"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </ActionContainer>
        );
      },
    },
  ];

  return (
    <Container>
      <TopBar />
      <Bottom>
        <Sidebar />
        <Main>
          <Title>User List</Title>
          <DataGridContainer>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
          </DataGridContainer>
        </Main>
      </Bottom>
    </Container>
  );
};

export default Users;
