import './App.css';
import {FC} from "react";
import {HashRouter} from "react-router-dom";
import AppRouter from "./AppRouter.tsx";

const App: FC = () => {

  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  )
}

export default App;
