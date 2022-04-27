import { NextPage } from "next";

interface Props {
  periodLabel: string;
}

const ReportText: NextPage<Props> = ({ periodLabel }) => (
  <div>{periodLabel}の散歩を報告中...</div>
);

export default ReportText;
