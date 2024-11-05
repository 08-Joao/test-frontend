export const validName = (name: string) => {
    // Expressão regular para validar que o nome contém apenas letras e espaços
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Inclui letras acentuadas
  
    return nameRegex.test(name);
  };