import React from "react";

/* Components */
import Personal from './Personal';
import Enterprise from './Enterprise';

function Login({ shop }) {
  return <>{shop ? <Enterprise /> : <Personal />}</>;
}

export default Login;
