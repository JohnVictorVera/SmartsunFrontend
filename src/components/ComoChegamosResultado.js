import React from "react";
import "./ComoChegamosResultado.css";

const ComoChegamosResultado = ({ children }) => (
  <section className="como-chegamos-section">
    <h1>Como funciona o cálculo</h1>
    <p>
      Ao informar seu CEP, consumo mensal e tarifa de energia, localizamos sua posição geográfica e consultamos a base da NASA para obter a irradiação solar média histórica da sua região.
      A produção de energia por placa é estimada com base na menor média mensal histórica, adotando um cenário conservador.
      Calculamos então quantas placas de 550W são necessárias para atender ao seu consumo médio mensal.
    </p>

    <h2>Investimento e Payback</h2>
    <p>
      O preço médio considerado por placa é de R$ 1.000 (São Paulo), somado a um custo adicional de R$ 4.500 referente à instalação e inversor.
      O investimento total é calculado da seguinte forma:
    </p>
    <div className="como-chegamos-formula">Investimento total = Quantidade de placas × 1000 + 4500</div>
    <p>
      Para estimar sua economia anual, subtraímos o custo mínimo obrigatório de R$ 30/mês da economia mensal (esse valor representa a média para casas monofásicas) e multiplicamos por 12:
    </p>
    <div className="como-chegamos-formula">Economia anual = (Economia mensal – R$30) × 12</div>
    <p>
      O tempo de retorno do investimento (payback) é obtido dividindo o investimento pela economia anual:
    </p>
    <div className="como-chegamos-formula">Tempo de retorno = Investimento / Economia anual</div>

    <h2>Impacto Ambiental</h2>
    <p>
      Também estimamos o impacto ambiental positivo do seu sistema:
    </p>
    <div className="como-chegamos-formula">Redução de CO₂ = Quantidade de placas × geração mensal × 0,071</div>
    <div className="como-chegamos-formula">Árvores equivalentes = Redução de CO₂ ÷ 21</div>
    <div className="como-chegamos-formula">Combustível fóssil evitado = Energia total gerada ÷ 10</div>

    <h2>Energia solar acessível e inteligente</h2>
    <p>
      Mesmo com geração total via energia solar, consideramos um custo mínimo obrigatório de R$ 30/mês na conta de energia, conforme regras das distribuidoras.
    </p>
    {children}
  </section>
);

export default ComoChegamosResultado;