"use client";

import { useState } from "react";
import {
  validateDob,
  validateLoanNumber,
  validateSSN,
  validateZipCode,
} from "../formValidation";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Box,
} from "@mui/material";

const initialFormValues = {
  infoType: "personal",
  ssn: "",
  dob: "",
  zip: "",
  loanNumber: "",
};

export default function ForgotEmail() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recoveredEmails, setRecoveredEmails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validate form fields
  const validateField = (name, value) => {
    switch (name) {
      case "ssn":
        return validateSSN(value);
      case "dob":
        return validateDob(value);
      case "zip":
        return validateZipCode(value);
      case "loanNumber":
        return validateLoanNumber(value);
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Determine fields based on infoType
    const fieldsToValidate = fieldsConfig[formValues.infoType];

    // Validate each field based on fieldsConfig for the current infoType
    fieldsToValidate.forEach((field) => {
      const error = validateField(field.name, formValues[field.name]);
      if (error) {
        formErrors[field.name] = error;
      }
    });

    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
      //setRecoveredEmails(["user@example.com"]);
      //setRecoveredEmails(["user@example.com", "abc@gm.com"]);
      setRecoveredEmails([]);
    } else {
      setErrors(formErrors);
    }
  };

  const fieldsConfig = {
    personal: [
      { label: "Last 4 of SSN", name: "ssn", maxLength: 4 },
      { label: "Date of birth", name: "dob", maxLength: 10 },
      { label: "Zip code", name: "zip", maxLength: 5 },
    ],
    loan: [
      { label: "Loan number", name: "loanNumber", maxLength: 10 },
      { label: "Zip code", name: "zip", maxLength: 5 },
    ],
  };

  const renderFields = () => {
    const currentFields = fieldsConfig[formValues.infoType];
    return currentFields.map((field) => (
      <Box sx={{ marginTop: 3 }} key={field.name}>
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          value={formValues[field.name]}
          onChange={handleInputChange}
          onBlur={handleBlur}
          maxLength={field.maxLength}
          error={errors[field.name]}
        />
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        minWidth: 320,
        margin: "0 auto",
        backgroundColor: "#FFF",
        padding: 5,
      }}
    >
      <h2>
        {!submitted
          ? `Forgot Email`
          : recoveredEmails.length > 1
          ? "Found Emails"
          : "Found Email"}
      </h2>
      <p>
        {!submitted
          ? `Enter the following information to verify your identity and recover your email.`
          : recoveredEmails.length === 1
          ? "Use this email to Login"
          : recoveredEmails.length > 1
          ? "Use one of these emails to Login"
          : "The data you entered does not match our records. Verify the information you entered is correct and try again, or call 1-800-365-4441 for assistance."}
      </p>
      {submitted ? (
        <>
          {recoveredEmails.map((email, index) => (
            <Box key={index}>{email}</Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSubmitted(false)}
          >
            Login
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" fullWidth margin="normal">
            <RadioGroup
              row
              name="infoType"
              value={formValues.infoType}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="personal"
                control={<Radio />}
                label="Personal Info"
              />
              <FormControlLabel
                value="loan"
                control={<Radio />}
                label="Loan Number"
              />
            </RadioGroup>
          </FormControl>

          {renderFields()}
          <Box sx={{ marginTop: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="primary-color"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
      <p>
        If you need help, contact Customer Service at 800.365.4441, Mon-Fri 5am
        to 5pm PT. (Excluding certain holidays)
      </p>
    </Box>
  );
}

const InputField = ({ label, name, value, onChange, onBlur, error }) => (
  <Box sx={{ marginTop: 3 }}>
    <TextField
      fullWidth
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={label}
      label={label}
      error={!!error}
      helperText={error || " "}
      variant="outlined"
    />
  </Box>
);
