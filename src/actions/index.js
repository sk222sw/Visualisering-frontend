import assign from "lodash/assign";
import settings from "./settings";
import websocket from "./websocket";

export default assign(
  {},
  settings,
  websocket
);
