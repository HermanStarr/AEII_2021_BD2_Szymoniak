import React, {useState} from 'react';
import './App.css';
import {HashRouter, BrowserRouter} from "react-router-dom";
import Sidebar from "./shared/Sidebar";
import {UserResponse} from "./model/dto";

export const UserContext = React.createContext<{userInfo: UserResponse | null, setUserInfo: (val: UserResponse | null) => void}>(null!);

function App() {
  const [userInfo, setUserInfo] = useState< UserResponse | null>(null)

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <HashRouter>
        <Sidebar/>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;

