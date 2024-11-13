// Função para formatar o CEP
export const formatCEP = (cep: string): string => {
    // Remove os caracteres não numéricos
    const cleaned = cep.replace(/\D/g, '');

    // Formata o CEP no formato "00000-000"
    let formatted = cleaned;
    if (cleaned.length > 5) {
        formatted = cleaned.slice(0, 5) + '-' + cleaned.slice(5);
    }

    // Valida se o CEP tem o tamanho correto (8 dígitos)
    if (cleaned.length === 8) {
        return formatted;
    } else if (cleaned.length > 8) {
        return "CEP Inválido";
    }

    return formatted;
};
