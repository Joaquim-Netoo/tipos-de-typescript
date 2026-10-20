export {};

// ===== Exercício 08: Formulário de cadastro =====

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  // c é string aqui. Aceita 'CLI-0042' ou '42'
  const digitos = c.replace(/\D/g, '');
  return `CLI-${digitos.padStart(4, '0')}`;
}

const codigo: number | string = 42;

type Tamanho = 'P' | 'M' | 'G' | 'GG';
const tamanho: Tamanho = 'M';
// const invalido: Tamanho = 'XG';
// error TS2322: Type '"XG"' is not assignable to type 'Tamanho'.

type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';

function calcularFrete(regiao: Regiao): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

const complemento: string | null = null;
const endereco = `Rua das Flores, 100 - ${complemento ?? '(sem complemento)'}`;

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

// Inferência de literais
const r = 'sul'; // const: o tipo inferido é o literal "sul"
// let r2 = 'sul'; // let: o tipo é alargado para string, e string não cabe em Regiao
// calcularFrete(r2);
// error TS2345: Argument of type 'string' is not assignable to parameter of type 'Regiao'.
// Como o let pode ser reatribuído, o TS o alarga para `string`. Correção com as const:
let r2 = 'sul' as const; // tipo "sul"

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: ${endereco}`);
console.log(`Frete para o ${r}: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Frete para o ${r2}: R$ ${calcularFrete(r2).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
console.log(`Telefone: ${limparTelefone(69999990000)}`);
console.log(formatarCodigo('CLI-0042'));
