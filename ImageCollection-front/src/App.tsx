import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter} from "react-router-dom";
import Sidebar from "./shared/Sidebar";

// export const UserContext = React.createContext<{userInfo: GetUserDto | null, setUserInfo: (val: <JakiesDTO> | null) => void}>(null!);

// const HashRouter = require("react-router-dom").HashRouter;

function App() {
  // const [userInfo, setUserInfo] = useState< <JakiesDto> | null>(null)

  return (
    // <UserContext.Provider value={{userInfo, setUserInfo}}>
      <BrowserRouter>
        <Sidebar/>
      </BrowserRouter>
    // </UserContext.Provider>
  );
}

export default App;

