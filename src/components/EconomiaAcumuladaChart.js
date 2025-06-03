import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const EconomiaAcumuladaChart = ({ economiaAnual, anos = 15 }) => {
  const data = Array.from({ length: anos }, (_, i) => ({
    ano: i + 1,
    economia: economiaAnual * (i + 1)
  }));

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
        <LineChart data={data}>
          <CartesianGrid stroke="#b3b3b3" strokeWidth={1.2} vertical={true} horizontal={true} />
          <XAxis dataKey="ano" stroke="#212E5A" tick={{ fontWeight: 600 }} />
          <YAxis stroke="#212E5A" tick={{ fontWeight: 600 }} />
          <Tooltip formatter={v => `R$ ${Number(v).toLocaleString("pt-BR")}`} />
          <Line
            type="monotone"
            dataKey="economia"
            stroke="#212E5A"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#212E5A", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6, stroke: "#212E5A", strokeWidth: 2, fill: "#1a73e8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EconomiaAcumuladaChart;