export const generateShortCode = () => {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  let shortCode = "";
  for (let i = 0; i < 6; i++) {
    shortCode += str[Math.floor(Math.random() * 62)];
  }
  return shortCode;
};
