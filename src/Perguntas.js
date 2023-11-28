import React, { useState } from 'react';
import './Perguntas.css';


const Perguntas = () => {
  const [terraAlqueires, setTerraAlqueires] = useState('');
  const [dataPlantio, setDataPlantio] = useState('');
  const [phSolo, setPhSolo] = useState('');
  const [melhorPlanta, setMelhorPlanta] = useState('');
  const [quantidadeGraos, setQuantidadeGraos] = useState('');
  const [agrotoxico, setAgrotoxico] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica para gerar sugestões com base nas respostas do usuário

    // Exemplo: sugestão de melhor planta
    if (terraAlqueires > 10 && phSolo > 6) {
      setMelhorPlanta('Milho');
    } else {
      setMelhorPlanta('Trigo');
    }

    // Exemplo: cálculo da quantidade de grãos necessários
    const areaPlantada = parseFloat(terraAlqueires) * 4046.86; // 1 alqueire = 4046.86 metros quadrados
    const densidadePlantio = 50; // Exemplo de densidade de plantio (ajuste conforme necessário)
    const quantidadeGraosCalculada = areaPlantada * densidadePlantio;
    setQuantidadeGraos(quantidadeGraosCalculada.toFixed(2));

    // Exemplo: sugestão de agrotóxico
    if (phSolo < 5) {
      setAgrotoxico('Agrotóxico A');
    } else {
      setAgrotoxico('Agrotóxico B');
    }
  };

  return (
    <div>
      <h1>Formulário de Perguntas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Quantidade de Terra (Alqueires):
          <input
            type="number"
            value={terraAlqueires}
            onChange={(e) => setTerraAlqueires(e.target.value)}
          />
        </label>
        <br />
        <label>
          Data de Plantio:
          <input
            type="date"
            value={dataPlantio}
            onChange={(e) => setDataPlantio(e.target.value)}
          />
        </label>
        <br />
        <label>
          pH do Solo:
          <input
            type="number"
            step="0.1"
            value={phSolo}
            onChange={(e) => setPhSolo(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Gerar Sugestões</button>
      </form>

      {melhorPlanta && (
        <div>
          <h2>Sugestões:</h2>
          <p>Melhor Planta: {melhorPlanta}</p>
          <p>Quantidade de Grãos Necessários: {quantidadeGraos} grãos</p>
          <p>Agrotóxico Recomendado: {agrotoxico}</p>
        </div>
      )}

      {/* Adicione aqui o componente de agenda ou outras funcionalidades desejadas */}
    </div>
  );
};

export default Perguntas;
