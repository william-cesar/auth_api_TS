export const validateEmail = (mail: string) => {
  const mailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const isValid: boolean = mailRegex.test(mail);

  return isValid;
};
