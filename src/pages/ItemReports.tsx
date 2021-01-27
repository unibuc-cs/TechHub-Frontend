/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReportCard from "../components/Reports/ReportCard";
import { accessTokenSelector } from "../store/user/user.selector";
import {
  getReportsByItem,
  deleteReport,
} from "../store/reports/reports.actions";
import { reportsSelector } from "../store/reports/reports.selectors";
import { Report } from "../store/store";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ItemReports: React.FC<{ reportedItemId: string }> = ({
  reportedItemId,
}) => {
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);
  const reports = useSelector(reportsSelector);

  useEffect(() => {
    dispatch(getReportsByItem(accessToken, reportedItemId));
  }, []);

  const onDeleteReport = (reportId: string) => {
    dispatch(deleteReport(accessToken, reportId));
  };

  return (
    <Container>
      {reports.map((report: Report) => (
        <ReportCard
          key={report.id}
          report={report}
          hasGoToThreadButton={false}
          onDeleteReport={onDeleteReport}
        />
      ))}
    </Container>
  );
};

export default ItemReports;
