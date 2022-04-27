import styled from "styled-components";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Bottom = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 5;
  padding: 20px;
`;

const Wrapper = styled.div``;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1``;

const CreateButton = styled(Button)``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const UserInfoContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const UserInfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 0.5px solid lightgray;
`;

const UserNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const UserName = styled.p`
  font-weight: 600;
`;

const UserTitle = styled.p``;

const UserInfoBottom = styled.div`
  margin-top: 20px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 16px;
`;

const UserInfoTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 30px 0 10px;
`;

const ListItem = styled.li`
  padding: 6px 0 6px 12px;
  display: flex;
  align-items: center;
`;

const ItemText = styled.span`
  margin-left: 12px;
`;

const UserUpdate = styled.div`
  flex: 3;
  padding: 20px;
  margin-left: 20px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const UpdateTitle = styled.h3``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const FormInputContainer = styled.div`
  display: flex;
`;

const UpdateImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const UpdateImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  color: #fdd835;
`;

const UpdateInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex: 2;
`;

const UserUpdateItem = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 20px 0px 0px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
`;

const User = () => {
  return (
    <Container>
      <TopBar />
      <Bottom>
        <Sidebar />
        <Main>
          <Wrapper>
            <UserHeader>
              <Title>USER INFO</Title>
              <StyledLink to="/newUser">
                <CreateButton variant="contained">CREATE</CreateButton>
              </StyledLink>
            </UserHeader>
            <UserInfoContainer>
              <UserInfo>
                <UserInfoTop>
                  <Image src="/images/Ayaka.jpg" alt="" />
                  <UserNameBlock>
                    <UserName>Kamisato Ayaka</UserName>
                    <UserTitle>Shirasagi Himegimi</UserTitle>
                  </UserNameBlock>
                </UserInfoTop>
                <UserInfoBottom>
                  <List>
                    <UserInfoTitle>Account Details</UserInfoTitle>
                    <ListItem>
                      <PersonIcon />
                      <ItemText>AyayaAyaya</ItemText>
                    </ListItem>
                    <ListItem>
                      <CalendarMonthIcon />
                      <ItemText>28th September</ItemText>
                    </ListItem>
                    <UserInfoTitle>Contact Details</UserInfoTitle>
                    <ListItem>
                      <PhoneIphoneIcon />
                      <ItemText>+1 234 567 89</ItemText>
                    </ListItem>
                    <ListItem>
                      <EmailIcon />
                      <ItemText>Ayaya@gmail.com</ItemText>
                    </ListItem>
                    <ListItem>
                      <LocationOnIcon />
                      <ItemText>Yashiro Commision, Inazuma</ItemText>
                    </ListItem>
                  </List>
                </UserInfoBottom>
              </UserInfo>
              <UserUpdate>
                <UpdateTitle>Edit Info</UpdateTitle>
                <Form>
                  <FormInputContainer>
                    <UpdateImageContainer>
                      <UpdateImage src="/images/Ayaka.jpg" alt="" />
                      <UploadInput type="file" id="file" />
                      <UploadLabel htmlFor="file">
                        <DriveFolderUploadIcon
                          sx={{ width: "40px", height: "40px" }}
                        />
                      </UploadLabel>
                    </UpdateImageContainer>
                    <UpdateInputContainer>
                      <UserUpdateItem>
                        <Label>Username</Label>
                        <Input
                          type="text"
                          id="username"
                          placeholder="AyayaAyaya"
                        />
                      </UserUpdateItem>
                      <UserUpdateItem>
                        <Label>Full Name</Label>
                        <Input
                          type="text"
                          id="username"
                          placeholder="Kamisato Ayaka"
                        />
                      </UserUpdateItem>
                      <UserUpdateItem>
                        <Label>Email</Label>
                        <Input
                          type="text"
                          id="username"
                          placeholder="ayaya@gmail.com"
                        />
                      </UserUpdateItem>
                      <UserUpdateItem>
                        <Label>Phone</Label>
                        <Input
                          type="text"
                          id="username"
                          placeholder="+1 234 567 89"
                        />
                      </UserUpdateItem>
                      <UserUpdateItem>
                        <Label>Address</Label>
                        <Input
                          type="text"
                          id="username"
                          placeholder="Yashiro Commision, Inazuma"
                        />
                      </UserUpdateItem>
                    </UpdateInputContainer>
                  </FormInputContainer>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "100px",
                      backgroundColor: "teal",
                      alignSelf: "center",
                      marginTop: "30px",
                    }}
                  >
                    UPDATE
                  </Button>
                </Form>
              </UserUpdate>
            </UserInfoContainer>
          </Wrapper>
        </Main>
      </Bottom>
    </Container>
  );
};

export default User;
