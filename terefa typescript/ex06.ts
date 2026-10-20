export {};

// ===== Exercício 06: Status do pedido no app de delivery =====

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
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

function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
    return status;
  }
  return status + 1;
}

// Simulação do início ao fim
let atual: StatusPedido = StatusPedido.Recebido;
console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`); // mapeamento reverso
while (atual !== StatusPedido.Entregue) {
  atual = avancar(atual);
  console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// const outro: FormaPagamento = 'PIX';
// error TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Por quê: enums de string são nominais. O tipo FormaPagamento só aceita os membros do
// enum (FormaPagamento.Pix), não a string solta com o mesmo valor. Isso evita misturar
// strings arbitrárias com valores do enum.
