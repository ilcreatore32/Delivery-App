import React from "react";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 1rem auto;
`;

const Spinner = ({ loading }) => {
  return (
    <div className="sweet-loading">
      <ScaleLoader color="#5b36b4" loading={loading} css={override} size={50} />
    </div>
  );
};

export default Spinner;
