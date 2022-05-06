import { render, screen } from "@testing-library/react";
import ReportText from "./reportText";

describe("ReportText", () => {
  it("renders ReportText component", () => {
    render(<ReportText periodLabel="朝"/>);
    screen.getByText("朝の散歩を報告中...");
  });
});
