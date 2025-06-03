import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceDot } from 'recharts';

const EconomiaAcumuladaChart = ({ economiaAnual, investimento, anos = 10 }) => {
  // Ano atual
  const anoAtual = new Date().getFullYear();

  // Gera dados para 10 anos, usando anos reais
  const data = [];
  let acumulado = 0;
  let paybackAno = null;
  for (let i = 1; i <= anos; i++) {
    acumulado += economiaAnual;
    if (!paybackAno && acumulado >= investimento) paybackAno = i;
    data.push({
      ano: anoAtual + i, // Exibe 2026, 2027, etc.
      economia: acumulado
    });
  }

  return (
    <div style={{
      maxWidth: 900,
      margin: "2rem auto",
      padding: "1.5rem 1rem",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 0 16px rgba(0,0,0,0.05)"
    }}>
      <div style={{
        color: "#212E5A",
        textAlign: "center",
        marginBottom: "1rem",
        fontSize: "1.2rem",
        fontWeight: 600
      }}>
        Economia Acumulada ao Longo dos Anos
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        >
          <CartesianGrid stroke="#b3b3b3" strokeWidth={1.2} vertical={true} horizontal={true} />
          <XAxis
            dataKey="ano"
            stroke="#212E5A"
            tick={{ fontWeight: 600 }}
            label={{ value: "Ano", position: "insideBottom", offset: -5, fill: "#212E5A", fontWeight: 600 }}
          />
          <YAxis
            stroke="#212E5A"
            tick={{ fontWeight: 600 }}
            tickFormatter={v => `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            allowDataOverflow={true}
            label={{
              value: "Economia",
              angle: -90,
              position: "insideLeft",
              fill: "#212E5A",
              fontWeight: 600,
              dx: -60
            }}
          />
          <Tooltip formatter={v => `R$ ${Number(v).toLocaleString("pt-BR")}`} />
          <Line
            type="monotone"
            dataKey="economia"
            stroke="#212E5A"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#212E5A", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6, stroke: "#212E5A", strokeWidth: 2, fill: "#1a73e8" }}
          />
          {paybackAno && (
            <ReferenceDot
              x={anoAtual + paybackAno}
              y={investimento}
              r={8}
              fill="#ff9800"
              stroke="#212E5A"
              label={{
                value: `Payback (${anoAtual + paybackAno})`,
                position: "top",
                fill: "#ff9800",
                fontWeight: "bold"
              }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EconomiaAcumuladaChart;