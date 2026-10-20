export {};

// ===== Exercício 09: Lendo a resposta de uma API de clima =====

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// 1. Versão com any: o compilador não ajuda em nada
function lerComAny(json: string): string {
  const dados: any = JSON.parse(json);
  return `${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`;
}
// lerComAny(respostaQuebrada) compila, mas na execução dá:
// TypeError: dados.temperatura.toFixed is not a function
// (temperatura é a string "quente", e strings não têm toFixed)

// 3. Função never: nunca retorna, sempre lança
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// 2. Versão segura com unknown
function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch (e: unknown) {
    if (e instanceof SyntaxError) falhar('JSON malformado');
    throw e;
  }

  if (typeof dados !== 'object' || dados === null) {
    falhar('resposta não é um objeto');
  }
  if (!('cidade' in dados) || typeof dados.cidade !== 'string') {
    falhar('campo "cidade" inválido');
  }
  if (!('temperatura' in dados) || typeof dados.temperatura !== 'number') {
    falhar('campo "temperatura" inválido');
  }
  return { cidade: dados.cidade, temperatura: dados.temperatura };
}

// 4 e 5. try/catch com unknown
for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}

// Demonstração do problema do any (capturado para não derrubar o programa):
try {
  lerComAny(respostaQuebrada);
} catch (erro: unknown) {
  if (erro instanceof Error) console.log(`[any] ${erro.name}: ${erro.message}`);
}
