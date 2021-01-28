/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserDetails } from "../store/store";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsSelector } from "../store/userDetails/userDetails.selector";
import {
  getUserDetailsByEmail,
  changeProfilePicture,
} from "../store/userDetails/userDetails.actions";
import {
  accessTokenSelector,
  currentEmailSelector,
} from "../store/user/user.selector";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const Container = styled.div`
  width: 100%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const BottomContainerRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 8px 0;
`;

const ProfilePictureContainer = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BasicInformationContainer = styled.div`
  padding-left: 8px;
  width: 70%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const Text = styled.p`
  font-size: 1.3em;
  font-family: "Montserrat", sans-serif;
`;

const AchievementText = styled.p`
  font-size: 1.2em;
  font-family: "Montserrat", sans-serif;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px;
`;

const UploadButtonContainer = styled.div`
  margin-top: 4px;
`;

const AchievementArea = styled.div`
  width: 100%:
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [profileWasChanged, setProfileWasChanged] = useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const currentUserDetails: UserDetails = useSelector(userDetailsSelector);
  const accessToken = useSelector(accessTokenSelector);
  const currentUserEmail = useSelector(currentEmailSelector);

  useEffect(() => {
    dispatch(getUserDetailsByEmail(accessToken, currentUserEmail));
  }, []);

  useEffect(() => {
    setProfilePicture(currentUserDetails.profilePicture);
  }, [currentUserDetails]);

  const onImageChangedHandler = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setProfileWasChanged(true);
  };

  const onChangeImageButtonClicked = () => {
    dispatch(
      changeProfilePicture(accessToken, currentUserEmail, profilePicture)
    );
  };

  return (
    <Container>
      <TopContainer>
        <ProfilePictureContainer>
          <ProfilePicture src={profilePicture} />
          <UploadButtonContainer>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={onImageChangedHandler}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                size="small"
                style={{ fontFamily: "Montserrat" }}
              >
                Upload
              </Button>
            </label>
          </UploadButtonContainer>
          {profileWasChanged ? (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ marginTop: "4px", fontFamily: "Montserrat" }}
              onClick={onChangeImageButtonClicked}
            >
              Save Changes
            </Button>
          ) : null}
        </ProfilePictureContainer>
        <BasicInformationContainer>
          <Text>
            <b>Email: </b> {currentUserDetails.email}
          </Text>
          <Text>
            <b>Username: </b> {currentUserDetails.username}
          </Text>
        </BasicInformationContainer>
      </TopContainer>
      <BottomContainer>
        <BottomContainerRow>
          <Paper
            elevation={3}
            style={{
              width: "175px",
              height: "125px",
              backgroundColor: "#228B22",
              color: "white",
            }}
          >
            <AchievementArea>
              <AchievementText>
                <b>TOTAL POINTS</b>
              </AchievementText>
              <AchievementText>
                {currentUserDetails.totalPoints}
              </AchievementText>
            </AchievementArea>
          </Paper>
          <Paper
            elevation={3}
            style={{
              width: "175px",
              height: "125px",
              backgroundColor: "#228B22",
              color: "white",
            }}
          >
            <AchievementArea>
              <AchievementText>
                <b>CURRENT POINTS</b>
              </AchievementText>
              <AchievementText>
                {currentUserDetails.currentPoints}
              </AchievementText>
            </AchievementArea>
          </Paper>
        </BottomContainerRow>
        <BottomContainerRow>
          <Paper
            elevation={3}
            style={{
              width: "175px",
              height: "125px",
              backgroundColor: "#228B22",
              color: "white",
            }}
          >
            <AchievementArea>
              <AchievementText>
                <b>TROPHIES</b>
              </AchievementText>
              <AchievementText>{currentUserDetails.trophies}</AchievementText>
            </AchievementArea>
          </Paper>
          <Paper
            elevation={3}
            style={{
              width: "175px",
              height: "125px",
              backgroundColor: "#228B22",
              color: "white",
            }}
          >
            <AchievementArea>
              <AchievementText>
                <b>RAFFLES WON</b>
              </AchievementText>
              <AchievementText>
                {currentUserDetails.rafflesWon !== null
                  ? currentUserDetails.rafflesWon
                  : "0"}
              </AchievementText>
            </AchievementArea>
          </Paper>
        </BottomContainerRow>
        {currentUserDetails.type === "REGULAR_USER" ? (
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "8px", fontFamily: "Montserrat" }}
            onClick={() => {
              history.push("/homescreen/owned-discounts");
              onClose();
            }}
          >
            Discounts History
          </Button>
        ) : null}
      </BottomContainer>
    </Container>
  );
};

export default Profile;
