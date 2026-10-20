export {};

// ===== Exercício 05: Boletim do clima =====

type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const temperaturas: number[] = leituras.map(([, t]) => t);
const [minima, maxima] = extremos(temperaturas);
const media: number = temperaturas.reduce((a, t) => a + t, 0) / temperaturas.length;
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// Tupla com elemento opcional
type Contato = [nome: string, telefone: string, email?: string];
const contatoComEmail: Contato = ['Ana', '(69) 99999-0000', 'ana@jornal.com'];
const contatoSemEmail: Contato = ['Bruno', '(69) 98888-1111'];
console.log(contatoComEmail, contatoSemEmail);

// Tupla com rest
type Historico = [string, ...number[]];
const historico: Historico = ['Porto Velho', 33, 35, 34, 36, 32, 34, 33];
const [cidadeHist, ...semana] = historico;
const mediaSemana: number = semana.reduce((a, t) => a + t, 0) / semana.length;
console.log(`Média semanal de ${cidadeHist}: ${mediaSemana.toFixed(1)}°C`);

// Tupla somente leitura
const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC';
// error TS2540: Cannot assign to '0' because it is a read-only property.
console.log(capitalOficial);
