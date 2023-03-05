import React from "react";

import { useFormikContext } from "formik";
import AppButton from "../btns/AppButton";

const SubmitButton = ({ title, color, textColor, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      color={color}
      textColor={textColor}
      {...otherProps}
    />
  );
};

export default SubmitButton;
