export const validateLoginRequest = (email: string, password: string) => {
  // Regular expression for validating an email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression for validating a password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if email and password are provided
  if (!email || !password) {
    throw new Error("Invalid Credentials");
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    throw new Error("Invalid Credentials");
  }

  // Validate password format
  if (!passwordRegex.test(password)) {
    throw new Error("Invalid Credentials");
  }

  return true; // Valid email and password
};
