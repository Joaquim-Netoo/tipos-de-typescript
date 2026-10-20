export {};

// ===== Exercício 10: Sistema de estacionamento (projeto integrador) =====

// ---------- Tipos ----------
type Placa = string;
type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// ---------- Regras de negócio ----------
function calcularTarifa(v: Veiculo, horas: number): number {
  const adicionais = horas - 1;
  switch (v.tipo) {
    case 'carro':
      return 8 + adicionais * 5;
    case 'moto':
      return 4 + adicionais * 2;
    case 'caminhao':
      return 15 + adicionais * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}
// Teste da verificação exaustiva: ao acrescentar
//   type Van = { readonly placa: Placa; tipo: 'van' };
//   type Veiculo = Carro | Moto | Caminhao | Van;
// sem tratar 'van' no switch, o compilador acusa:
//   error TS2322: Type 'Van' is not assignable to type 'never'.
// O `never` garantiu que, se uma variante nova for esquecida no switch, o erro
// aparece em tempo de compilação, e não como bug em produção.

function fecharTicket(t: Ticket): Ticket {
  const [entrada, saida] = t.periodo;
  const horas = Math.max(1, saida - entrada);
  const base = calcularTarifa(t.veiculo, horas);
  const valor = t.selo ? base * 0.5 : base;
  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function horasDe(t: Ticket): number {
  return Math.max(1, t.periodo[1] - t.periodo[0]);
}

function registrar(msg: string): void {
  console.log(msg);
}

// ---------- Entrada externa ----------
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerVeiculo(json: string): Veiculo {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch {
    return falhar('JSON malformado');
  }
  if (typeof dados !== 'object' || dados === null) falhar('veículo inválido');
  if (!('placa' in dados) || typeof dados.placa !== 'string') falhar('campo "placa" inválido');
  if (!('tipo' in dados) || typeof dados.tipo !== 'string') falhar('campo "tipo" inválido');

  const placa = dados.placa;
  switch (dados.tipo) {
    case 'carro': {
      if (!('portas' in dados) || (dados.portas !== 2 && dados.portas !== 4)) {
        falhar('campo "portas" inválido');
      }
      return { placa, tipo: 'carro', portas: dados.portas };
    }
    case 'moto': {
      if (!('cilindradas' in dados) || typeof dados.cilindradas !== 'number') {
        falhar('campo "cilindradas" inválido');
      }
      return { placa, tipo: 'moto', cilindradas: dados.cilindradas };
    }
    case 'caminhao': {
      if (!('eixos' in dados) || typeof dados.eixos !== 'number') {
        falhar('campo "eixos" inválido');
      }
      return { placa, tipo: 'caminhao', eixos: dados.eixos };
    }
    default:
      return falhar(`tipo "${dados.tipo}" desconhecido`);
  }
}

// ---------- Dados de teste ----------
const abertos: Ticket[] = [
  { veiculo: { placa: 'ABC1D23', tipo: 'carro', portas: 4 }, periodo: [8, 11], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 }, periodo: [9, 10], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 }, periodo: [7, 12], selo: false, situacao: SituacaoTicket.Aberto },
  { veiculo: { placa: 'XYZ4E56', tipo: 'carro', portas: 2 }, periodo: [14, 16], selo: true, situacao: SituacaoTicket.Aberto },
];

// ---------- Relatório ----------
const fechados: Ticket[] = abertos.map(fecharTicket);

fechados
  .filter((t) => t.situacao === SituacaoTicket.Pago)
  .map(
    (t) =>
      `[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horasDe(t)}h - R$ ${(t.valor ?? 0).toFixed(2)}` +
      (t.selo ? ' (selo -50%)' : ''),
  )
  .forEach(registrar);

const faturamento: number = fechados.reduce((acc, t) => acc + (t.valor ?? 0), 0);
registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);

const entradas = fechados.reduce(
  (acc, t) => {
    acc[t.veiculo.tipo] += 1;
    return acc;
  },
  { carro: 0, moto: 0, caminhao: 0 },
);
registrar(`Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`);

// Entrada externa
try {
  lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) registrar(`Erro ao ler veículo: ${erro.message}`);
}
