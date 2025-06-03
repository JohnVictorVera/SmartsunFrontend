import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const meses = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

function getMesesAtePayback(dataInicial, payback) {
  const mesesArray = [];
  const data = new Date(dataInicial);
  for (let i = 0; i < Math.ceil(payback); i++) {
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    mesesArray.push(`${mes}/${ano}`);
    data.setMonth(data.getMonth() + 1);
  }
  return mesesArray;
}

const PaybackMesChart = ({ investimento, economiaMensal, payback, dataInicial }) => {
  if (!investimento || !economiaMensal || !payback || !dataInicial) return null;

  const mesesLabels = getMesesAtePayback(dataInicial, payback);
  let acumulado = 0;
  const data = mesesLabels.map((label, idx) => {
    acumulado += economiaMensal;
    return {
      mes: label,
      acumulado: acumulado > investimento ? investimento : acumulado
    };
  });

  // Descobre o mês do payback
  let paybackMes = null;
  let acumuladoTemp = 0;
  for (let i = 0; i < data.length; i++) {
    acumuladoTemp += economiaMensal;
    if (acumuladoTemp >= investimento) {
      paybackMes = data[i].mes;
      break;
    }
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h4>Mês do Payback: {paybackMes}</h4>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="acumulado" stroke="#212E5A" />
          <ReferenceLine y={investimento} label="Investimento" stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const PaybackAnoChart = ({ investimento, economiaMensal, payback, dataInicial }) => {
  if (!investimento || !economiaMensal || !payback || !dataInicial) return null;

  const economiaAnual = economiaMensal * 12;
  const anos = Math.ceil(payback);
  const data = [];
  let acumulado = 0;
  const dataObj = new Date(dataInicial);

  for (let i = 0; i < anos; i++) {
    acumulado += economiaAnual;
    const anoLabel = dataObj.getFullYear() + i;
    data.push({
      ano: `${anoLabel}`,
      acumulado: acumulado > investimento ? investimento : acumulado
    });
  }

  // Descobre o ano do payback
  let paybackAno = null;
  let acumuladoTemp = 0;
  for (let i = 0; i < data.length; i++) {
    acumuladoTemp += economiaAnual;
    if (acumuladoTemp >= investimento) {
      paybackAno = data[i].ano;
      break;
    }
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h4>Ano do Payback: {paybackAno}</h4>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="ano" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="acumulado" stroke="#212E5A" />
          <ReferenceLine y={investimento} label="Investimento" stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { PaybackMesChart, PaybackAnoChart };