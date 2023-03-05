import React from "react";
import ErrorText from "./texts/ErrorText";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) return null;
  return <ErrorText>{error}</ErrorText>;
};

export default ErrorMessage;
