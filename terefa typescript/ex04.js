// ===== Exercício 04: Lista de compras do mês =====
const itens = [
    { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
    { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
    { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
    { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
    { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];
const nomes = itens.map((i) => i.nome);
const caros = itens.filter((i) => i.preco > 10);
const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((i) => i.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
// Array somente leitura
const categorias = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Higiene');
// error TS2339: Property 'push' does not exist on type 'readonly string[]'.
console.log(categorias.length);
// Matriz: quantidade de itens em cada posição das 3 prateleiras
const despensa = [[2, 0, 1], [4, 4], [1]];
const itensNaDespensa = despensa.reduce((acc, prateleira) => acc + prateleira.reduce((a, q) => a + q, 0), 0);
console.log(`Itens na despensa: ${itensNaDespensa}`);
// Desestruturação e spread
const [primeiro, segundo] = itens;
console.log(primeiro?.nome, segundo?.nome);
const novaLista = [...itens, { nome: 'Açúcar 1kg', preco: 5.5, quantidade: 2 }];
console.log(itens.length, novaLista.length); // 5 6 (a original não mudou)
export {};
