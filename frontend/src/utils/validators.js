export const nameRules = {
  required: 'Name is required',
  minLength: { value: 2, message: 'Min 2 characters' },
  maxLength: { value: 100, message: 'Max 100 characters' }
};

export const courseRules = {
  required: 'Course is required'
};

export const yearRules = {
  min: { value: 1, message: 'Min year is 1' },
  max: { value: 6, message: 'Max year is 6' },
  valueAsNumber: true
};

export const dateOfBirthRules = {
  required: 'Date of birth is required',
  validate: (v) => {
    const age = (new Date() - new Date(v)) / (365.25 * 24 * 3600 * 1000);
    return age >= 15 || 'Student must be at least 15 years old';
  }
};

export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email address'
  }
};

export const mobileNumberRules = {
  required: 'Mobile number is required',
  pattern: {
    value: /^[6-9]\d{9}$/,
    message: 'Enter a valid 10-digit Indian mobile number'
  }
};

export const genderRules = {
  required: 'Gender is required'
};

export const addressRules = {
  required: 'Address is required',
  maxLength: { value: 500, message: 'Max 500 characters' }
};
