export const validPassword = (password: string) => {
    // Expressão regular para verificar os critérios da senha
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
  
    return passwordRegex.test(password);
  };