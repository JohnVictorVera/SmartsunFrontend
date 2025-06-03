import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConsumoGeracaoChart = ({ consumo, geracao }) => {
  // Exemplo de dados
  const data = [
    { name: 'Consumo', valor: consumo },
    { name: 'Geração', valor: geracao }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="valor" fill="#212E5A" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ConsumoGeracaoChart;