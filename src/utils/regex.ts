export const emailRegex = (email: string): boolean => {
  return emailExpression.test(email);
};

export const passwordRegex = (password: string): boolean => {
  return passwordExpression.test(password);
};

export const emailExpression = /^\S+@\S+$/i;

export const passwordExpression = /^.{8,}$/;
