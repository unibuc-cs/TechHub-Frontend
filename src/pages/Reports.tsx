/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { accessTokenSelector } from "../store/user/user.selector";
import { getReports, deleteReport } from "../store/reports/reports.actions";
import {
  reportsSelector,
  reportsLoadingSelector,
} from "../store/reports/reports.selectors";
import ReportCard from "../components/Reports/ReportCard";
import { Report } from "../store/store";
import Spinner from "../components/UI/Spinner/Spinner";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 2.7em;
  font-family: "Montserrat", sans-serif;
`;

const ReportsContainer = styled.div`
  width: 100%;
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Reports = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);
  const reports = useSelector(reportsSelector);
  const reportsLoading = useSelector(reportsLoadingSelector);

  useEffect(() => {
    dispatch(getReports(accessToken));
  }, []);

  const onDeleteReport = (reportId: string) => {
    dispatch(deleteReport(accessToken, reportId));
  };

  let reportsContent = null;
  if (!reportsLoading) {
    if (reports.length > 0) {
      reportsContent = (
        <ReportsContainer>
          {reports.map((report: Report) => (
            <ReportCard
              key={report.id}
              report={report}
              onDeleteReport={onDeleteReport}
              hasGoToThreadButton={true}
            />
          ))}
        </ReportsContainer>
      );
    } else {
      reportsContent = (
        <h1 style={{ fontFamily: "Montserrat" }}>There are no reports.</h1>
      );
    }
  } else {
    reportsContent = <Spinner />;
  }

  return (
    <Container>
      <Title>Reports</Title>
      {reportsContent}
    </Container>
  );
};

export default Reports;
