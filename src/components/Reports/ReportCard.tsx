import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { Report } from "../../store/store";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button/Button";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import DoneIcon from "@material-ui/icons/Done";
import DirectionsIcon from "@material-ui/icons/Directions";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const LeftContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;

const RightContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ThreadTitle = styled.div`
  font-size: 1.6em;
  font-family: "Montserrat", sans-serif;
`;

const SubtitleText = styled.div`
  font-size: 1.3em;
  font-family: "Montserrat", sans-serif;
`;

const months = [
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
];

const ReportCard: React.FC<{
  report: Report;
  onDeleteReport: (reportId: string) => void;
}> = ({ report, onDeleteReport }) => {
  const history = useHistory();

  return (
    <Paper elevation={3} style={{ width: "50%", margin: "16px 0" }}>
      <Container>
        <HeaderContainer>
          <TitleContainer>
            <ThreadTitle>
              <b>Thread: </b>
              {report.threadInformation.title}
            </ThreadTitle>
            <Tooltip arrow title="This report has not been resolved">
              <HourglassEmptyIcon />
            </Tooltip>
          </TitleContainer>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#231f20",
              color: "white",
              fontFamily: "Montserrat",
            }}
            startIcon={<DirectionsIcon />}
            onClick={() =>
              history.push({
                pathname: `/homescreen/thread/${report.threadInformation.id}`,
                state: { threadInformation: report.threadInformation },
              })
            }
            size="small"
          >
            Go to thread
          </Button>
        </HeaderContainer>
        <Divider />
        <ContentContainer>
          <LeftContainer>
            <SubtitleText>
              <b>Reported on: </b>
              {report.isPostReport ? "Post" : "Thread"}
            </SubtitleText>
            <SubtitleText>
              <b>Reported by: </b>
              {report.reporterId}
            </SubtitleText>
            <SubtitleText>
              <b>Report date: </b>
              {`${new Date(report.dateReported).getDate()} ${
                months[new Date(report.dateReported).getMonth()]
              } at ${new Date(report.dateReported).getHours()}:${new Date(
                report.dateReported
              ).getMinutes()}`}
            </SubtitleText>
            <SubtitleText>
              <b>Reported for: </b>
              {report.reportType}
            </SubtitleText>
            <SubtitleText>
              <b>Report description: </b>
              {report.description}
            </SubtitleText>
          </LeftContainer>
          <RightContainer>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#228B22",
                fontFamily: "Montserrat",
                color: "white",
              }}
              startIcon={<DoneIcon />}
              onClick={() => onDeleteReport(report.id)}
              size="small"
            >
              Mark as solved
            </Button>
          </RightContainer>
        </ContentContainer>
      </Container>
    </Paper>
  );
};

export default ReportCard;
