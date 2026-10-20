const porEmail = (destinatario, mensagem) => {
    console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};
const porSms = (destinatario, mensagem) => {
    if (mensagem.length > 160) {
        console.log('SMS ignorado: mensagem longa');
        return; // return antecipado (vazio)
    }
    console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};
const porApp = (destinatario, mensagem) => {
    console.log(`[APP] para ${destinatario}: ${mensagem}`);
};
function notificarTodos(destinatarios, mensagem, enviar) {
    destinatarios.forEach((d) => enviar(d, mensagem));
}
const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], aviso, porSms);
notificarTodos(['(69) 99999-0000'], 'x'.repeat(200), porSms);
// function teste(): void { return 10; }
// error TS2322: Type 'number' is not assignable to type 'void'.
// Reflexão: um tipo de função com retorno `void` significa "o chamador não vai usar o
// retorno", e não "a função não pode retornar nada". Por isso funções que devolvem
// valores são atribuíveis (ex.: o forEach ignora o que o callback retorna). Já uma
// declaração direta `function f(): void` é checada de forma estrita.
const contar = (d, m) => m.length;
console.log(contar('x', 'abc')); // o número é ignorado pelo tipo, mas continua existindo
export {};
