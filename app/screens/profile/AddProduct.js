import React, { useState } from "react";
import * as Yup from "yup";

import AppForm from "./AppForm";
import AppFormField from "./AppFormField";
import AppFormDropdown from "./AppFormDropdown";
import Button from "./Button";
import AppButton from "../../components/btns/AppButton";
import SubmitButton from "../../components/form/SubmitButton";

const formSchema = Yup.object().shape({
  formFields: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      type: Yup.string().required(),
    })
  ),
});

const initialValues = {
  formFields: [],
};

const fieldOptions = [
  { label: "Text", value: "text" },
  { label: "Dropdown", value: "dropdown" },
];

function CreateForm({ onSubmit }) {
  const [formFields, setFormFields] = useState([]);

  const handleAddField = () => {
    setFormFields((prevFields) => [...prevFields, { name: "", type: "" }]);
  };

  const handleRemoveField = (index) => {
    setFormFields((prevFields) => [
      ...prevFields.slice(0, index),
      ...prevFields.slice(index + 1),
    ]);
  };

  return (
    <AppForm
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      <h2>Create Form</h2>
      {formFields.map((field, index) => (
        <View key={index}>
          <AppFormField name={`formFields[${index}].name`} label="Field Name" />
          <AppFormDropdown
            name={`formFields[${index}].type`}
            label="Field Type"
            data={fieldOptions}
            placeholder="Select Type"
          />
          <AppButton
            title="Remove Field"
            onPress={() => handleRemoveField(index)}
          />
        </View>
      ))}
      <AppButton title="Add Field" onPress={handleAddField} />
      <SubmitButton title="Submit" />
    </AppForm>
  );
}

export default CreateForm;
