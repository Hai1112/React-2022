import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../redux/apiCalls";

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
  height: calc(100vh - 150px);
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

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProducts(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 400,
      renderCell: (params) => {
        return (
          <UserContainer>
            <Image src={params.row.image} alt="" />
            {params.row.title}
          </UserContainer>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 120 },
    // { field: "status", headerName: "Status", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    {
      filed: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <ActionContainer>
            <Link to={`/product/${params.row._id}`}>
              <Button color="white" bg="#3bb077">
                Edit
              </Button>
            </Link>
            <Button
              color="red"
              bg="#f9dbdd"
              onClick={() => handleDelete(params.row._id)}
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
              rows={products}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
            />
          </DataGridContainer>
        </Main>
      </Bottom>
    </Container>
  );
};

export default Products;
