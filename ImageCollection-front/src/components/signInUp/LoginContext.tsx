import {LoginRequest} from "../../model/dto";
import React, {useContext} from "react";
import {UserContext} from "../../App";
import Login from "./Login";

type Props = {
  loginData?: LoginRequest;
}

const LoginContext = (props: Props) => {

  const context = useContext(UserContext)
  return (
    <>
      <Login
        loginData={props.loginData}
        context={context}
      />
    </>
  );

};

export default LoginContext;