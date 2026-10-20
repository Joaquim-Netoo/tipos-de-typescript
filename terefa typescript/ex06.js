// ===== Exercício 06: Status do pedido no app de delivery =====
var StatusPedido;
(function (StatusPedido) {
    StatusPedido[StatusPedido["Recebido"] = 1] = "Recebido";
    StatusPedido[StatusPedido["EmPreparo"] = 2] = "EmPreparo";
    StatusPedido[StatusPedido["SaiuParaEntrega"] = 3] = "SaiuParaEntrega";
    StatusPedido[StatusPedido["Entregue"] = 4] = "Entregue";
    StatusPedido[StatusPedido["Cancelado"] = 5] = "Cancelado";
})(StatusPedido || (StatusPedido = {}));
var FormaPagamento;
(function (FormaPagamento) {
    FormaPagamento["Pix"] = "PIX";
    FormaPagamento["Cartao"] = "CARTAO";
    FormaPagamento["Dinheiro"] = "DINHEIRO";
})(FormaPagamento || (FormaPagamento = {}));
function mensagem(status) {
    switch (status) {
        case StatusPedido.Recebido:
            return 'Recebemos seu pedido!';
        case StatusPedido.EmPreparo:
            return 'Seu pedido está sendo preparado 🍳';
        case StatusPedido.SaiuParaEntrega:
            return 'O entregador está a caminho 🛵';
        case StatusPedido.Entregue:
            return 'Pedido entregue. Bom apetite!';
        case StatusPedido.Cancelado:
            return 'Pedido cancelado.';
    }
}
function avancar(status) {
    if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
        return status;
    }
    return status + 1;
}
// Simulação do início ao fim
let atual = StatusPedido.Recebido;
console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`); // mapeamento reverso
while (atual !== StatusPedido.Entregue) {
    atual = avancar(atual);
    console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);
}
const pagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);
export {};
// const outro: FormaPagamento = 'PIX';
// error TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Por quê: enums de string são nominais. O tipo FormaPagamento só aceita os membros do
// enum (FormaPagamento.Pix), não a string solta com o mesmo valor. Isso evita misturar
// strings arbitrárias com valores do enum.
