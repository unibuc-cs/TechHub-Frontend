/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { accessTokenSelector } from "../store/user/user.selector";
import { getReports } from "../store/reports/reports.actions";
import { reportsSelector } from "../store/reports/reports.selectors";
import ReportCard from "../components/Reports/ReportCard";
import { Report } from "../store/store";

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

  useEffect(() => {
    dispatch(getReports(accessToken));
  }, []);

  return (
    <Container>
      <Title>Reports</Title>
      {reports.length > 0 ? (
        <ReportsContainer>
          {reports.map((report: Report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </ReportsContainer>
      ) : (
        <h1>There are no reports.</h1>
      )}
    </Container>
  );
};

export default Reports;
