import React, { useState, useEffect } from 'react';
import './Home.css'; // Certifique-se de ajustar o caminho conforme necessário

function Home() {
  const [climaData, setClimaData] = useState(null);
  const [reaisInput, setReaisInput] = useState('');
  const [dollarsInput, setDollarsInput] = useState('');
  const [resultDollar, setResultDollar] = useState('');
  const [resultReal, setResultReal] = useState('');
  const [cidadeInput, setCidadeInput] = useState('Ivaiporã');

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

  async function convertToDollars() {
    const dollarPrice = await getDollarPrice();
    if (!isNaN(reaisInput)) {
      const dollars = reaisInput / dollarPrice;
      setResultDollar(`$${dollars.toFixed(2)} (USD)`);
    } else {
      setResultDollar('Insira um valor válido em reais.');
    }
    await fetchClimaData(reaisInput);
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
    if (!isNaN(reaisInput)) {
      const dollars = reaisInput / dollarPrice;
      setResultDollar(`$${dollars.toFixed(2)} (USD)`);
    } else {
      setResultDollar('Insira um valor válido em reais.');
    }
    await fetchClimaData(cidadeInput);
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
  }, []);
  return (
    <div>

      

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container">
        {/* ARTIGO API CLIMA TEMPO */}
        <div id="divPai">
        
           
            {climaData && climaData.sys && (
              <div className='containerClima'>
                <div>
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
        <div className="box">
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
            <button onClick={convertToDollars}>Converter para USD</button>
            <p id="result-dollar">{resultDollar}</p>


            <input
              type="number"
              id="dollars-input"
              placeholder="Insira o valor em USD"
              value={dollarsInput}
              onChange={(e) => setDollarsInput(e.target.value)}
            />
            <button onClick={convertToReais}>Converter para BRL</button>
            <p id="result-real">{resultReal}</p>
          </div>
          </div>
        </div>
      </div>

      {/* <footer className="footer">
        <h1 className="">CONTATO</h1>
        <div className="containerFooter">
          <div className="formulario">
            <form action="">
              <input type="text" name="" id="nome" placeholder="NOME" />
              <input type="text" name="" id="email" placeholder="E-MAIL" />
              <input type="text" name="" id="mensagem" placeholder="MENSAGEM" />
            </form>
          </div>
          <div>
            <img src="./imgs/plantar 2.png" alt="" />
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default Home;
