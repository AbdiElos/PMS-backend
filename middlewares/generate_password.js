
const generateRandomPassword = () => {
    // Define character sets for letters and digits
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
  
    let password = '';
    
    // Generate 3 random letters
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      password += letters.charAt(randomIndex);
    }
  
    // Generate 3 random digits
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      password += digits.charAt(randomIndex);
    }
  
    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  };
  
  module.exports = { generateRandomPassword };
  