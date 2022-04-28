import { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 20px;
  -webkit-box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  cursor: pointer;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 0.5px solid lightgray;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 12px;
  flex: 1;
  line-height: 24px;
`;

const UserName = styled.p`
  font-weight: 600;
`;

const UserTitle = styled.p`
  font-weight: 400;
  font-size: 14px;
`;

const WidgetSmall = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <Container>
      <Title>New Joined</Title>
      <List>
        {users?.map((user) => (
          <ListItem key={user._id}>
            <Image src={user.image || "/images/default_user.png"} alt="" />
            <UserInfo>
              <UserName>{user.username}</UserName>
              <UserTitle>{user.title}</UserTitle>
            </UserInfo>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WidgetSmall;
