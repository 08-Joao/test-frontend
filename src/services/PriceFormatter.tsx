// Função para formatar o valor monetário
export const formatCurrency = (value: string | number): string => {
    // Converte o valor para número, se for uma string
    const cleanedValue = typeof value === 'string' ? value.replace(/\D/g, '') : value.toString();

    // Converte para número e formata para duas casas decimais
    const formattedValue = parseFloat(cleanedValue).toFixed(2);

    // Verifica se o valor é um número válido
    if (isNaN(parseFloat(formattedValue))) {
        return "R$ 0";
    }

    // Formata o valor para "R$ 3423.43"
    return `R$ ${parseFloat(formattedValue).toLocaleString('pt-BR')}`;
};
