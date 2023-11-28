import React, { useState, useEffect } from 'react';
import './Home.css'; // Certifique-se de ajustar o caminho conforme necessário
import './Perguntas.css';



const Perguntas = () => {
  const [terraAlqueires, setTerraAlqueires] = useState('');
  const [dataPlantio, setDataPlantio] = useState('');
  const [phSolo, setPhSolo] = useState('');
  const [melhorPlanta, setMelhorPlanta] = useState('');
  const [quantidadeGraos, setQuantidadeGraos] = useState('');
  const [agrotoxico, setAgrotoxico] = useState('');
  const [showHome, setShowHome] = useState(false);

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
    setShowHome(true);
  };

  return (
    <div>
      {showHome && (
      <button onClick={() => setShowHome(false)} className='voltar'>Voltar</button>
    )}
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

function Home() {
  const [climaData, setClimaData] = useState(null);
  const [reaisInput, setReaisInput] = useState('');
  const [dollarsInput, setDollarsInput] = useState('');
  const [resultDollar, setResultDollar] = useState('');
  const [resultReal, setResultReal] = useState('');
  const [cidadeInput, setCidadeInput] = useState('Ivaiporã');
  const [showPerguntas, setShowPerguntas] = useState(false);

  async function getDollarPrice() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=brl');
      const data = await response.json();
      const dollarPrice = data.usd.brl;
      const dollarPriceElement = document.getElementById('dollar-price');
      dollarPriceElement.textContent = ` Dólar: R$${dollarPrice.toFixed(2)}`;
      return dollarPrice;
    } catch (error) {
      console.error('Erro ao obter o preço do dólar:', error);
    }
  }

  async function fetchClimaData(nomeCidade) {
    try {
      const apiKey = '64ed82577ced7f69cb1687f0ce536131'; // Substitua pela sua chave de API
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setClimaData(data);
    } catch (error) {
      console.error('Erro ao obter dados do clima:', error);
    }
  }


  function construirData(d) {
    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dia = dias[d.getDay()];
    const data = d.getDate();
    const mes = meses[d.getMonth()];
    const ano = d.getFullYear();
    return `${dia}, ${data} ${mes} ${ano}`;
  }

  async function convertToDollars() {
    const dollarPrice = await getDollarPrice();
    await fetchClimaData(cidadeInput);
  
    // Usar o valor diretamente da variável local em vez de reaisInput
    const inputAsNumber = parseFloat(reaisInput);
  
    if (!isNaN(inputAsNumber)) {
      const dollars = inputAsNumber / dollarPrice;
      setResultDollar(`$${dollars.toFixed(2)} (USD)`);
    } else {
      setResultDollar('Insira um valor válido em reais.');
    }
  }
  
  
  async function convertToReais() {
    const dollarPrice = await getDollarPrice();
    if (!isNaN(dollarsInput)) {
      const reais = dollarsInput * dollarPrice;
      setResultReal(`R$${reais.toFixed(2)} (BRL)`);
    } else {
      setResultReal('Insira um valor válido em dólares.');
    }
    await fetchClimaData(cidadeInput);
  }

  useEffect(() => {
    getDollarPrice();
    convertToDollars()
  }, []);

  
  return (
    <div>
      <div className="container">
        <div>
          <button className='perguntas' onClick={() => setShowPerguntas(true)}>Completar cadastro</button>
          {showPerguntas ? <Perguntas /> : (
            <>
              {/* ARTIGO API CLIMA TEMPO */}
              <div id="divPai">
                {climaData && climaData.sys && (
                  <div className='containerClima'>
                    <div className='containerCidadeData'>
                      <div className="cidade">{`${climaData.name}, ${climaData.sys.country}`}</div>
                      <div className="data">{construirData(new Date())}</div>
                    </div>
                    <div className="container-temp">
                      {climaData && climaData.main && (
                        <>
                          <div className="temperatura">{`${Math.round(climaData.main.temp)}`}</div>
                          <span>&deg;C</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div className="card-footer" id="busca">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Digite o nome da cidade"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      onChange={(e) => setCidadeInput(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-warning text-dark" type="button" id="button-addon2" onClick={convertToDollars}>
                        <i className=""> Buscar</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ARTIGO API DOLAR */}
              <div className="box wave">
                <svg className="svg-clip">
                  <defs>
                    <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
                      <path d="M0,0 C0.3,0.3 0.2,-0.06 0.8,0 C1,0 1,-0.8 1,0 C1.2,-0.1 1.0,-0.1 0,0 C0.32,-0.225 0.85,0.064 1,0.2 L2,1 L0,1 Z" fill="#ffffff"></path>
                    </clipPath>
                  </defs>
                </svg>
                <div id="dollar-price-container">
                  <p id="dollar-price"> Dólar: Carregando...</p>
                  <div className='containerValor'>
                    <input
                      type="number"
                      id="reais-input"
                      placeholder="Insira o valor em R$"
                      value={reaisInput}
                      onChange={(e) => setReaisInput(e.target.value)}
                    />
                    <button className='converter' onClick={convertToDollars}>Converter para USD</button>
                    <p id="result-dollar">{resultDollar}</p>

                    <input
                      type="number"
                      id="dollars-input"
                      placeholder="Insira o valor em USD"
                      value={dollarsInput}
                      onChange={(e) => setDollarsInput(e.target.value)}
                    />
                    <button className='converter' onClick={convertToReais}>Converter para BRL</button>
                    <p id="result-real">{resultReal}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}




export default Home;
