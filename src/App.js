import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import JsonForm from "./forms/JsonForm";

function App() {
  return (
    <Provider store={store}>
      <JsonForm />
    </Provider>
  );
}

export default App;
