// ===== Exercício 02: Cupom fiscal =====
const nomeDigitado = ' maria da silva ';
const PREPOSICOES = ['da', 'de', 'do'];
function formatarNome(nome) {
    return nome
        .trim()
        .split(' ')
        .filter((p) => p !== '') // remove espaços duplicados
        .map((p) => {
        const minuscula = p.toLowerCase();
        if (PREPOSICOES.includes(minuscula))
            return minuscula;
        return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
        .join(' ');
}
// Conversões
const precoLido = '12.40';
const quantidadeLida = '3un';
const preco = Number(precoLido);
const quantidade = parseInt(quantidadeLida, 10);
const clienteFidelidade = true;
const numeroCupom = 42;
const subtotal = preco * quantidade;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const totalCupom = subtotal - desconto;
const cupom = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalCupom.toFixed(2)}`;
console.log(cupom);
export {};
