import {FunctionComponent} from "react";
import {Route, Routes} from "react-router-dom";
import TestComponent from "../components/TestComponent.tsx";

const AppRouter: FunctionComponent = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TestComponent />} />
    </Routes>
  );
}

export default AppRouter;