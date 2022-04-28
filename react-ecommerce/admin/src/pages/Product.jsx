import { Button } from "@mui/material";
import styled from "styled-components";
import Chart from "../components/Chart";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { productData } from "../DATA";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../requestMethods";

const Container = styled.div``;

const Bottom = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 5;
  padding: 20px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
`;

const ProductInfo = styled.div`
  padding: 20px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
`;

const ImageWrapper = styled.div``;

const Image = styled.img`
  height: 200px;
  object-fit: contain;
`;

const InfoWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InfoItem = styled.div``;

const ProductChart = styled.div`
  width: 100%;
`;

const Right = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  padding: 20px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UploadImage = styled.img`
  height: 300px;
  object-fit: contain;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  color: #fdd835;
`;

const InputContainer = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 1px solid lightgray;
`;

const Select = styled.select`
  padding: 10px;
  outline: none;
`;

const Option = styled.option``;

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [productStats, setProductStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

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
    const getProductStats = async () => {
      try {
        const res = await userRequest.get(`/orders/income?pid=${productId}`);
        const list = res.data.sort((a, b) => a._id - b._id);
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: Months[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.error(err);
      }
    };
    getProductStats();
  }, [Months, productId]);

  return (
    <Container>
      <TopBar />
      <Bottom>
        <Sidebar />
        <Main>
          <ProductHeader>
            <Title>{product.title}</Title>
            <StyledLink to="/newProduct">
              <Button variant="contained">CREATE</Button>
            </StyledLink>
          </ProductHeader>
          <Wrapper>
            <Left>
              <ProductInfo>
                <ImageWrapper>
                  <Image src={product.image} alt="" />
                </ImageWrapper>
                <InfoWrapper>
                  <InfoItem>
                    <b>Product: </b>
                    {product.title}
                  </InfoItem>
                  <InfoItem>
                    <b>Product ID: </b>
                    {product._id}
                  </InfoItem>
                  <InfoItem>
                    <b>Price: </b>$ {product.price}
                  </InfoItem>
                  <InfoItem>
                    <b>Sales: </b>4795
                  </InfoItem>
                  <InfoItem>
                    <b>Active: </b>Yes
                  </InfoItem>
                  <InfoItem>
                    <b>In Stock: </b>
                    {product.inStock}
                  </InfoItem>
                </InfoWrapper>
              </ProductInfo>
              <ProductChart>
                <Chart
                  data={productStats}
                  dataKey="Sales"
                  title="Sale Performance"
                />
              </ProductChart>
            </Left>
            <Right>
              <Form>
                <UploadContainer>
                  <UploadImage src={product.image} alt="" />
                  <UploadInput type="file" id="file" />
                  <UploadLabel htmlFor="file">
                    <DriveFolderUploadIcon
                      sx={{ width: "40px", height: "40px" }}
                    />
                  </UploadLabel>
                </UploadContainer>
                <InputContainer>
                  <InputItem>
                    <InputLabel>Product Name</InputLabel>
                    <Input type="text" placeholder={product.title} />
                  </InputItem>
                  <InputItem>
                    <InputLabel>Product Description</InputLabel>
                    <Input type="text" placeholder={product.description} />
                  </InputItem>
                  <InputItem>
                    <InputLabel>Price</InputLabel>
                    <Input type="text" placeholder={product.price} />
                  </InputItem>
                  <InputItem>
                    <InputLabel>Active</InputLabel>
                    <Select>
                      <Option value="true">Yes</Option>
                      <Option value="false">No</Option>
                    </Select>
                  </InputItem>
                  <InputItem>
                    <InputLabel>In Stock</InputLabel>
                    <Select>
                      <Option value="true">Yes</Option>
                      <Option value="false">No</Option>
                    </Select>
                  </InputItem>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "20px",
                      width: "120px",
                      alignSelf: "center",
                    }}
                  >
                    UPDATE
                  </Button>
                </InputContainer>
              </Form>
            </Right>
          </Wrapper>
        </Main>
      </Bottom>
    </Container>
  );
};

export default Product;
