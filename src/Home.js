import React, { useState, useEffect } from 'react';
import './Home.css'; // Certifique-se de ajustar o caminho conforme necessário

function Home() {
  // State para armazenar valores convertidos
  const [reaisInput, setReaisInput] = useState('');
  const [dollarsInput, setDollarsInput] = useState('');
  const [resultDollar, setResultDollar] = useState('');
  const [resultReal, setResultReal] = useState('');

  // Função para obter o preço do dólar em tempo real
  async function getDollarPrice() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=brl');
      const data = await response.json();
      const dollarPrice = data.usd.brl;

      // Exibe o preço do dólar
      const dollarPriceElement = document.getElementById('dollar-price');
      dollarPriceElement.textContent = `Preço do dólar em tempo real: R$${dollarPrice.toFixed(2)}`;

      return dollarPrice;
    } catch (error) {
      console.error('Erro ao obter o preço do dólar:', error);
    }
  }

  // Função para converter reais para dólares
  async function convertToDollars() {
    const dollarPrice = await getDollarPrice();

    if (!isNaN(reaisInput)) {
      const dollars = reaisInput / dollarPrice;
      setResultDollar(`$${dollars.toFixed(2)} (USD)`);
    } else {
      setResultDollar('Insira um valor válido em reais.');
    }
  }

  // Função para converter dólares para reais
  async function convertToReais() {
    const dollarPrice = await getDollarPrice();

    if (!isNaN(dollarsInput)) {
      const reais = dollarsInput * dollarPrice;
      setResultReal(`R$${reais.toFixed(2)} (BRL)`);
    } else {
      setResultReal('Insira um valor válido em dólares.');
    }
  }

  // Chame getDollarPrice() para exibir o preço do dólar assim que a página carregar
  useEffect(() => {
    getDollarPrice();
  }, []);

  return (
    <div>

      <header className="bg-header">
        <div className="header">
          <a href="/">
            <img src="./svgs/plantar.svg" alt="" />
          </a>
          <nav>
            <ul className="header-menu">
              <li><a href="/">Inicio</a></li>
              <li><a href="/">Sobre Nós</a></li>
              <li><a href="/">Como Funciona</a></li>
              <li><a href="/">Contato</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container">
        {/* ARTIGO API CLIMA TEMPO */}
        <div id="divPai">
          {/* ... (seu conteúdo do clima tempo) */}
        </div>

        {/* ARTIGO API DOLAR */}
        <div className="box">
          <div id="dollar-price-container">
            <p id="dollar-price">Preço do dólar em tempo real: Carregando...</p>
            <input
              type="number"
              id="reais-input"
              placeholder="Insira o valor em R$"
              value={reaisInput}
              onChange={(e) => setReaisInput(e.target.value)}
            />
            <button onClick={convertToDollars}>Converter para USD</button>
            <p id="result-dollar">{resultDollar}</p>

            <hr />

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

      {/* FOOTER */}
      <footer className="footer">
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
      </footer>
    </div>
  );
}

export default Home;
