import React from "react";

import Body from "./Body.js";
import reducer, { initialState } from "./reducer.js";
import { StateProvider } from "./StateProvider";
export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Body />
    </StateProvider>
  );
}
