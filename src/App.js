import React, { useState } from 'react';
import './App.css';

function Welcome() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <section>
        <div className='primeiraParte'>
          <img src='/Fundo.png' className='fundoVerde' alt='Background'></img>
          <img src='/farmwise.png' className='farmwise' alt='Farmwise Logo'></img>
          <img src='/plantaWhite.png' className='plantinha' alt='Plant'></img>
        </div>
        {isLogin ? (
          <article className='login'>
            <div className='welcome'>
              <h1>Bem vindo!</h1>
              <p>Faça login para entrar</p>
            </div>
            <div className="inputsLogin">
              <input type='email' placeholder='Email'></input>
              <input type='password' placeholder='Senha'></input>
              <button>Entrar</button>
              <p>Ainda não tem uma conta? <a onClick={handleToggleView}>Cadastre-se</a> </p>
            </div>
          </article>
        ) : (
          <article className='login'>
            <div className='welcome'>
              <h1>Bem vindo!</h1>
              <p>Cadastre-se para entrar</p>
            </div>
            <div className="inputsLogin">
              <input type='text' placeholder='Nome'></input>
              <input type='email' placeholder='Email'></input>
              <input type='password' placeholder='Senha'></input>
              <input type='password' placeholder='Confirmar senha'></input>
              <button>Cadastrar</button>
              <p>Já tem uma conta? <a onClick={handleToggleView}>Entre</a> </p>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}

export default Welcome;
