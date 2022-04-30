import styled from "styled-components";
import Navbar from "../components/Navbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAbout, updateAbout } from "../redux/apiCalls";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  ${mobile({ width: "100%" })}
`;

const UploadWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: all 0.3s ease-in;
  &:hover {
    opacity: ${(props) => props.opa};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  ${mobile({ borderRadius: 0 })}
`;

const FileUpload = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 8px;
  width: 100px;
  height: 60px;
  display: ${(props) => props.display};
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 10;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  ${mobile({ borderRadius: 0 })}
`;

const Heading = styled.div`
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
`;

const Edit = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ position: "inherit", width: "100%", marginTop: "10px" })}
`;

const EditIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  ${mobile({ marginRight: "20px" })}
`;

const AboutContainer = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column-reverse" })}
`;

const DescWrapper = styled.div`
  padding: 20px;
  flex: 3;
`;
const InputBlock = styled.div`
  &:first-child {
    margin-bottom: 20px;
  }
`;
const Label = styled.h3`
  margin-bottom: 12px;
`;
const TextAreaQuote = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  font-family: "Josefin Sans", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
  min-height: 10vh;
  border-bottom: 1px solid lightgrey;
`;

const Description = styled.div`
  width: 100%;
  font-family: "Josefin Sans", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: ${(props) => props.align};
  white-space: pre-line;
`;

const Social = styled.div`
  flex: 1;
  padding: 20px;
`;

const SocialBlock = styled.div`
  display: flex;
  align-items: center;
  overflow-wrap: break-word;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #468fdd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  font-family: "Josefin Sans", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
  min-height: 30vh;
  border-bottom: 1px solid lightgrey;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
  flex: 2;
`;

const SocialLink = styled.a`
  overflow-wrap: break-word;
  flex: 2;
`;

const About = () => {
  const dispatch = useDispatch();
  const about = useSelector((state) => state.about.currentAbout);
  const user = useSelector((state) => state.user.currentUser);
  const id = about?.[0]?._id;
  const [updateMode, setUpdateMode] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [file, setFile] = useState();
  const [desc, setDesc] = useState(about?.[0]?.desc);
  const [quote, setQuote] = useState(about?.[0]?.quote);
  const [facebook, setFacebook] = useState(about?.[0]?.facebook);
  const navigate = useNavigate();

  useEffect(() => {
    getAbout(dispatch);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage.preview);
    };
  }, [previewImage]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const FILE = e.target.files[0];
    FILE.preview = URL.createObjectURL(FILE);
    setPreviewImage(FILE);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateMode(false);
    if (file) {
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
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
            const about = { desc, facebook, quote, image: downloadURL };
            updateAbout(dispatch, about, id);
          });
        }
      );
    } else {
      const about = { desc, facebook, quote };
      updateAbout(dispatch, about, id);
    }
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <ImageWrapper>
            {about?.[0]?.image && (
              <Image
                src={previewImage ? previewImage.preview : about?.[0]?.image}
                alt=""
              />
            )}
            {updateMode && (
              <UploadWrapper opa={user ? 1 : 0}>
                <FileUpload type="file" id="file" onChange={handleFile} />
                <UploadLabel htmlFor="file" display={user ? "flex" : "none"}>
                  <DriveFolderUploadIcon
                    sx={{ color: "#fbc02d", width: "40px", height: "40px" }}
                  />
                </UploadLabel>
              </UploadWrapper>
            )}
          </ImageWrapper>
          <Heading>
            <Title>About Me</Title>
            <Edit>
              {updateMode && (
                <>
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    sx={{ backgroundColor: "teal" }}
                  >
                    UPDATE
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setUpdateMode(false)}
                    sx={{ marginLeft: "20px", backgroundColor: "lightcoral" }}
                  >
                    CANCEL
                  </Button>
                </>
              )}
              <EditIcon onClick={() => setUpdateMode(true)}>
                <DriveFileRenameOutlineIcon
                  sx={{ color: "teal", width: "40px", height: "40px" }}
                />
              </EditIcon>
            </Edit>
          </Heading>
          <AboutContainer>
            <DescWrapper>
              <InputBlock>
                <Label>Quote</Label>
                {updateMode ? (
                  <TextAreaQuote
                    defaultValue={about?.[0]?.quote}
                    onChange={(e) => setQuote(e.target.value)}
                  />
                ) : (
                  <Description align="left">{about?.[0]?.quote}</Description>
                )}
              </InputBlock>
              <InputBlock>
                <Label>More Info</Label>
                {updateMode ? (
                  <TextArea
                    defaultValue={about?.[0]?.desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                ) : (
                  <Description align="justify">{about?.[0]?.desc}</Description>
                )}
              </InputBlock>
            </DescWrapper>
            <Social>
              <SocialBlock>
                <Icon>
                  <FacebookIcon sx={{ color: "white" }} />
                </Icon>
                {updateMode ? (
                  <Input
                    type="text"
                    placeholder={about?.[0]?.facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                ) : (
                  <SocialLink href={about?.[0]?.facebook}>
                    {about?.[0]?.facebook}
                  </SocialLink>
                )}
              </SocialBlock>
            </Social>
          </AboutContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default About;
