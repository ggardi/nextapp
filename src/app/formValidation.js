// validation.js
export const validateZipCode = (value) => {
  if (!/^\d{5}$/.test(value)) {
    return "Zip code must be 5 digits";
  }
  return "";
};

export const validateSSN = (value) => {
  if (!/^\d{4}$/.test(value)) {
    return "SSN must be 4 digits";
  }
  return "";
};

export const validateLoanNumber = (value) => {
  if (!/^\d{10}$/.test(value)) {
    return "Loan number must be 10 digits";
  }
  return "";
};

//a function that validates that a date is in the format MM/DD/YYYY and 
//is not a future date and is not less than 18 years ago and returns a descriptive error message if it is not
export const validateDob = (value) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return "Date of birth must be in the format MM/DD/YYYY";
  }
  const dob = new Date(value);
  const now = new Date();
  const eighteenYearsAgo = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  if (dob > now) {
    return "Date of birth cannot be in the future";
  }
  if (dob > eighteenYearsAgo) {
    return "You must be at least 18 years old";
  }
  return "";
};
