import styled from "styled-components";
import SinglePost from "../components/SinglePost";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Container = styled.div`
  display: flex;
`;

const Single = () => {
  return (
    <>
      <Navbar />
      <Container>
        <SinglePost />
        <Sidebar />
      </Container>
    </>
  );
};

export default Single;
