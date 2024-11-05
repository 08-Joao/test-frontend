export const verifyAge = (birthDate: string) => {
    const today = new Date(); // Obtém a data atual
    const birthDateObj = new Date(birthDate); // Converte a data de nascimento para um objeto Date
  
    // Calcula a idade
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
  
    // Verifica se o aniversário já ocorreu este ano
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
  
    // Retorna true se a idade for maior ou igual a 18, caso contrário false
    return age >= 18;
  };