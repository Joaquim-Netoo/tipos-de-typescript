// ===== Exercício 03: Ficha de paciente =====
// Tipo de objeto escrito diretamente na anotação
const paciente1 = {
    cpf: '111.222.333-44',
    nome: 'Ana Souza',
    idade: 34,
    plano: true,
    alergias: ['dipirona', 'lactose'],
    contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 99999-0000' },
};
// Só os campos obrigatórios
const paciente2 = {
    cpf: '555.666.777-88',
    nome: 'Carlos Lima',
    idade: 61,
    plano: false,
};
function resumo(p) {
    const alergias = p.alergias !== undefined && p.alergias.length > 0
        ? `Alergias: ${p.alergias.join(', ')}`
        : 'Sem alergias registradas';
    return `${p.nome}, ${p.idade} anos. ${alergias}`;
}
console.log(resumo(paciente1));
console.log(resumo(paciente2));
// Erros provocados:
// paciente1.cpf = '000';
// error TS2540: Cannot assign to 'cpf' because it is a read-only property.
// paciente1.peso = 70;
// error TS2339: Property 'peso' does not exist on type '{ readonly cpf: string; nome: string; ... }'.
// Reflexão
let dados = paciente1;
// console.log(dados.nome);
// error TS2339: Property 'nome' does not exist on type 'object'.
// Por quê: `object` só diz "isto é um valor não primitivo" (objeto, array, função...).
// Não diz nada sobre quais propriedades existem, então o compilador não deixa acessar `nome`.
// A atribuição funciona, mas o tipo da variável "esquece" a forma do objeto.
console.log(typeof dados);
let x = 10;
// `{}` significa "qualquer valor que não seja null nem undefined". Números, strings e
// booleanos entram, então é aceito.
// let y: object = 10;
// error TS2322: Type 'number' is not assignable to type 'object'.
// `object` só aceita valores não primitivos; 10 é primitivo, então é rejeitado.
console.log(x);
export {};
