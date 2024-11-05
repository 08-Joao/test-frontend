// Função para formatar o número de telefone
export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove todos os caracteres não numéricos
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    // Adiciona formatação conforme o comprimento do número de telefone
    let formatted = cleaned;
    if (cleaned.length > 2) {
        formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    if (cleaned.length > 7) {
        formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
  
    return formatted;
  };