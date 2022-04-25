import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 600px;
  overflow: hidden;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: #444;
  z-index: 2;
`;

const TitleSmall = styled.p`
  font-size: 20px;
  font-family: "Lora", serif;
`;

const TitleLarge = styled.h1`
  font-size: 80px;
  font-weight: 500;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 90px;
`;

const Header = () => {
  return (
    <Container>
      <Heading>
        <TitleSmall>React & Node</TitleSmall>
        <TitleLarge>BLOG</TitleLarge>
      </Heading>
      <Image src="/images/Cover.jpg" alt="Cover"></Image>
    </Container>
  );
};

export default Header;
