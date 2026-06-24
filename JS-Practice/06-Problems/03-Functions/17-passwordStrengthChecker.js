function checkPassword(password) {
  let hasDigit = false;
  if (password.length < 8) return "weak";
  for (let i = 0; i < password.length; i++) {
    let char = password[i];
    if (char >= "0" && char <= "9") hasDigit = true;
  }
  if (!hasDigit) return "weak";
  return "strong";
}

console.log(checkPassword('hitheshaminhP@'));
