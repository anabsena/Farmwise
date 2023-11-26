// Em Welcome.js
import React, { useState } from 'react';
import './App.css';
import Home from './Home'; // Importe o componente Home
import { HiOutlineExclamation, IconName } from "react-icons/hi";

function Welcome() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState('');

  const handleToggleView = () => {
    setIsLogin(!isLogin);
    setError(''); // Limpar mensagens de erro ao alternar entre login e cadastro
  };
  const setErrorMessageTimeout = () => {
    setTimeout(() => {
      setError('');
    }, 5000); // 5000 milissegundos = 5 segundos
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    // Verificar campos obrigatórios
    if (!formData.email || !formData.password || !formData.name || !formData.confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      setErrorMessageTimeout();
      return;
    }

    // Verificação de senha
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      setErrorMessageTimeout();
      return;
    }

    // Simulação de registro de usuário
    localStorage.setItem('user', JSON.stringify(formData));
    setLoggedInUser(formData);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se está no modo de cadastro e executa o registro
    if (!isLogin) {
      handleRegister();
      setIsLogin(true); // Após o cadastro, muda para o modo de login
      return;
    }

    // Verifica se o usuário está registrado e faz login
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (
        formData.email === user.email &&
        formData.password === user.password
      ) {
        setLoggedInUser(user);
        console.log('Login bem-sucedido para:', user.name);
      } else {
        setError('Email ou senha incorretos');
        setErrorMessageTimeout();
      }
    } else {
      setError('Usuário não registrado');
      setErrorMessageTimeout();
    }
  };

  if (loggedInUser) {
    // Renderiza a próxima tela após o login/cadastro
    return <Home user={loggedInUser} />;
  }

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
            {error && <p className="error-message"><HiOutlineExclamation /> {error}</p>}
            <div className="inputsLogin">
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type='password'
                name='password'
                placeholder='Senha'
                value={formData.password}
                onChange={handleInputChange}
              />
              <button type='submit' onClick={handleSubmit}>
                Entrar
              </button>
              <p>
                Ainda não tem uma conta?{' '}
                <a onClick={handleToggleView}>Cadastre-se</a>{' '}
              </p>
            </div>
          </article>
        ) : (
          <article className='login'>
            <div className='welcome'>
              <h1>Bem vindo!</h1>
              <p>Cadastre-se para entrar</p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="inputsLogin">
              <input
                type='text'
                name='name'
                placeholder='Nome'
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type='password'
                name='password'
                placeholder='Senha'
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirmar senha'
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button type='submit' onClick={handleSubmit}>
                Cadastrar
              </button>
              <p>
                Já tem uma conta? <a onClick={handleToggleView}>Entre</a>{' '}
              </p>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}

export default Welcome;
