import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCover, updateCover } from "../redux/apiCalls";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Button } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { mobile } from "../responsive";

const Container = styled.div`
  position: relative;
  height: 600px;
  overflow: hidden;
  ${mobile({ height: "300px" })}
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

const ImageWrapper = styled.div`
  margin-top: 90px;
  position: relative;
`;

const UploadContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  opacity: 0;
  &:hover {
    opacity: ${(props) => props.opa};
  }
`;

const Wrapper = styled.div`
  display: ${(props) => props.display};
`;

const UploadLabel = styled.label`
  position: absolute;
  top: 0;
  left: 8px;
  width: 100px;
  height: 60px;
`;

const UploadInput = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Header = () => {
  const dispatch = useDispatch();
  const cover = useSelector((state) => state.cover.currentCover);
  const user = useSelector((state) => state.user.currentUser);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    getCover(dispatch);
  }, [dispatch]);

  const id = cover?.[0]?._id;

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const FILE = e.target.files[0];
    FILE.preview = URL.createObjectURL(FILE);
    setImagePreview(FILE);
  };

  const handleUpdate = () => {
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;

          default:
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newCover = { image: downloadURL };
          updateCover(dispatch, newCover, id);
        });
      }
    );
  };

  return (
    <Container>
      <Heading>
        <TitleSmall>Random</TitleSmall>
        <TitleLarge>BLOG</TitleLarge>
      </Heading>
      <ImageWrapper>
        <UploadContainer opa={user ? 1 : 0}>
          <Wrapper display={user ? "block" : "none"}>
            <UploadLabel htmlFor="uploadFile">
              <DriveFolderUploadIcon
                sx={{ color: "#fbc02d", width: "40px", height: "40px" }}
              />
            </UploadLabel>
            <Button
              variant="contained"
              sx={{ margin: "45px 0 0 10px" }}
              onClick={handleUpdate}
            >
              SAVE
            </Button>
          </Wrapper>
          <UploadInput type="file" id="uploadFile" onChange={handleFile} />
        </UploadContainer>
        <Image
          src={imagePreview ? imagePreview.preview : cover?.[0]?.image}
          alt="Cover"
        />
      </ImageWrapper>
    </Container>
  );
};

export default Header;
