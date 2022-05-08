import { rest } from "msw";
import list from "./api/calendar/list";

export const handlers = [rest.post("/api/calendar/list", list.post)];
