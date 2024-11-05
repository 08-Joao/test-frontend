export const verifyEmail = (email: string) => {
    // Expressão regular para validar o formato de um email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };