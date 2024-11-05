import { isValidCPF } from './CpfVerifier';
// Função para formatar o CPF
export const formatCPF = (cpf: string): string => {
    // Remove os caracteres não numéricos
  const cleaned = cpf.replace(/\D/g, '');

  let formatted = cleaned;
  {/* Adiciona os devidos caracteres referentes ao tamanho atual do CPF */}
  if (cleaned.length > 3) {
      formatted = cleaned.slice(0, 3) + '.' + cleaned.slice(3);
  }
  if (cleaned.length > 6) {
      formatted = formatted.slice(0, 7) + '.' + formatted.slice(7);
  }
  if (cleaned.length > 9) {
      formatted = formatted.slice(0, 11) + '-' + formatted.slice(11);
  }

  if (cleaned.length >= 11){
      if(!isValidCPF(cleaned)){
          return "Cpf Inválido";
      }
  }
  return formatted;
};