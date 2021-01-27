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
import {
  reportsSelector,
  reportsLoadingSelector,
} from "../store/reports/reports.selectors";
import { Report } from "../store/store";
import Spinner from "../components/UI/Spinner/Spinner";

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
  const reportsLoading = useSelector(reportsLoadingSelector);

  useEffect(() => {
    dispatch(getReportsByItem(accessToken, reportedItemId));
  }, []);

  const onDeleteReport = (reportId: string) => {
    dispatch(deleteReport(accessToken, reportId));
  };

  let reportsContent = null;
  if (!reportsLoading) {
    if (reports.length > 0) {
      reportsContent = reports.map((report: Report) => (
        <ReportCard
          key={report.id}
          report={report}
          hasGoToThreadButton={false}
          onDeleteReport={onDeleteReport}
        />
      ));
    } else {
      reportsContent = (
        <h1 style={{ fontFamily: "Montserrat" }}>There are no reports.</h1>
      );
    }
  } else {
    reportsContent = <Spinner />;
  }

  return <Container>{reportsContent}</Container>;
};

export default ItemReports;
