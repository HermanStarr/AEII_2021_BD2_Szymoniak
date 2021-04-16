import React, {useState} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Sidebar from "./shared/Sidebar";

// export const UserContext = React.createContext<{userInfo: GetUserDto | null, setUserInfo: (val: <JakiesDTO> | null) => void}>(null!);

// const HashRouter = require("react-router-dom").HashRouter;

function App() {
  // const [userInfo, setUserInfo] = useState< <JakiesDto> | null>(null)

  return (
    // <UserContext.Provider value={{userInfo, setUserInfo}}>
      <HashRouter>
        <Sidebar/>
      </HashRouter>
    // </UserContext.Provider>
  );
}

export default App;

