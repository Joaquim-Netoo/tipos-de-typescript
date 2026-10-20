export {};

// ===== Exercício 02: Cupom fiscal =====

const nomeDigitado: string = ' maria da silva ';

const PREPOSICOES: string[] = ['da', 'de', 'do'];

function formatarNome(nome: string): string {
  return nome
    .trim()
    .split(' ')
    .filter((p) => p !== '') // remove espaços duplicados
    .map((p) => {
      const minuscula = p.toLowerCase();
      if (PREPOSICOES.includes(minuscula)) return minuscula;
      return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
    .join(' ');
}

// Conversões
const precoLido: string = '12.40';
const quantidadeLida: string = '3un';
const preco: number = Number(precoLido);
const quantidade: number = parseInt(quantidadeLida, 10);

const clienteFidelidade: boolean = true;
const numeroCupom: number = 42;

const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const totalCupom: number = subtotal - desconto;

const cupom = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalCupom.toFixed(2)}`;

console.log(cupom);
