const EMAIL_REGEX = /^\S+@\S+$/i;
const PASSWORD_REGEX = /^.{8,}$/;

export const emailRegex = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const passwordRegex = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};
