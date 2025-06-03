import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GeracaoMensalChart = ({ dadosMensais }) => {
  // dadosMensais: [{ mes: 'Jan', geracao: 300 }, ...]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={dadosMensais}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="geracao" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GeracaoMensalChart;