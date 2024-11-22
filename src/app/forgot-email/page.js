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

// Constants
const initialFormValues = {
  infoType: "personal",
  ssn: "",
  dob: "",
  zip: "",
  loanNumber: "",
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

// Validation function
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

// Main Component
export default function ForgotEmail() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recoveredEmails, setRecoveredEmails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validate fields based on current infoType
    const fieldsToValidate = fieldsConfig[formValues.infoType];
    fieldsToValidate.forEach((field) => {
      const error = validateField(field.name, formValues[field.name]);
      if (error) formErrors[field.name] = error;
    });

    if (Object.keys(formErrors).length === 0) {
      //setSubmitted(true);
      //setRecoveredEmails(["user@example.com", "abc@gm.com"]);
      //setRecoveredEmails(["abc@gm.com"]);

      try {
        const response = await fetch('/api/forgot-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formValues}),
        });

        console.log('response', response)
  
  
        const result = await response.json();
        console.log('Submission successful:', result);
      } catch (error) {
        console.log('Submission Error:', error);
      } finally {
        setSubmitted(false);
      }
    } else {
      setErrors(formErrors);
    }


  };

  // Render Fields
  const renderFields = () => {
    const currentFields = fieldsConfig[formValues.infoType];
    return currentFields.map((field) => (
      <Box sx={{ marginTop: 3 }} key={field.name}>
        <InputField
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

  const renderMessage = () => {
    if (submitted && recoveredEmails.length === 0) {
      return (
        <>
          <p>
            Enter the following information to verify your identity and recover
            your email.
          </p>
          <p className="error">
            The data you entered does not match our records. Verify the
            information you entered is correct and try again, or call
            1-800-365-4441 for assistance.
          </p>
        </>
      );
    }

    if (recoveredEmails.length > 0) {
      return (
        <>
          <h3>
            Found {recoveredEmails.length} Email
            {recoveredEmails.length > 1 ? "s" : ""}
          </h3>
          {recoveredEmails.map((email, index) => (
            <Box key={index}>{email}</Box>
          ))}
          <Button variant="contained" onClick={() => setSubmitted(false)}>
            Login
          </Button>
        </>
      );
    }

    return (
      <p>
        Enter the following information to verify your identity and recover your
        email.
      </p>
    );
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        minWidth: 320,
        margin: "0 auto",
        padding: 5,
        backgroundColor: "white",
      }}
    >
      <h2>
        {submitted && recoveredEmails.length > 0
          ? "Found Emails"
          : "Forgot Email"}
      </h2>
      {renderMessage()}
      {recoveredEmails.length === 0 && (
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
            <Button type="submit" variant="contained" fullWidth>
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

// InputField Component
const InputField = ({ label, name, value, onChange, onBlur, error }) => (
  <TextField
    fullWidth
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    label={label}
    error={!!error}
    helperText={error || " "}
    variant="outlined"
    sx={{ marginTop: 3 }}
  />
);
