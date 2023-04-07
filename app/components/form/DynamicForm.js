import React from "react";
import * as Yup from "yup";
import AppForm from "./AppForm";
import AppFormDropdown from "./AppFormDropDown";
import AppFormField from "./AppFormField";

const formConfig = {
  initialValues: {
    name: "",
    email: "",
    country: "",
  },
  validationFields: [
    {
      name: "name",
      label: "Name",
      type: "string",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "string",
      required: true,
      email: true,
    },
    {
      name: "country",
      label: "Country",
      type: "object",
      required: true,
    },
  ],
  dropdownData: [
    { label: "USA", value: "usa" },
    { label: "Canada", value: "canada" },
    { label: "Mexico", value: "mexico" },
  ],
};

function DynamicForm({ formConfig }) {
  const { initialValues, validationFields, dropdownData } = formConfig;

  const validationSchema = generateValidationSchema(validationFields);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <AppForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {validationFields.map((field, index) => {
        if (field.type === "object") {
          return (
            <AppFormDropdown
              key={index}
              name={field.name}
              data={dropdownData}
              placeholder={field.label}
            />
          );
        } else {
          return (
            <AppFormField
              key={index}
              name={field.name}
              label={field.label}
              placeholder={field.label}
            />
          );
        }
      })}
    </AppForm>
  );
}

function generateValidationSchema(fields) {
  let validationSchema = {};

  fields.forEach((field) => {
    if (field.required && field.type === "string") {
      validationSchema[field.name] = Yup.string().required(
        `${field.label} is required`
      );
    } else if (field.required && field.type === "object") {
      validationSchema[field.name] = Yup.object()
        .nullable(true)
        .required(`${field.label} is required`);
    } else if (field.type === "string" && field.email) {
      validationSchema[field.name] = Yup.string()
        .email("Invalid email")
        .required(`${field.label} is required`);
    } else {
      validationSchema[field.name] = Yup[field.type]();
    }
  });

  return Yup.object().shape(validationSchema);
}

export default function App() {
  return <DynamicForm formConfig={formConfig} />;
}
