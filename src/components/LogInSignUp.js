import { useState } from 'react';
import axios from 'axios';
import Button from './UI/Button';
import config from '../config';
import { toast } from 'react-toastify';

const LoginSignUp = ({ setCookie, handleLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loginOrSignup, setLogOrSign] = useState('login');

  const getToken = () => {
    if (loginOrSignup === 'login') {
      axios
        .post(`${config.API_URL}/users/login`, { name, password })
        .then(({ data }) => {
          setCookie('token', data.token);
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.token}`;
          handleLogin(data.data.user);
        })
        .catch((err) => {
          toast('Incorrect name of password');
        });
    } else if (loginOrSignup === 'signup') {
      axios
        .post(`${config.API_URL}/users/signup`, {
          name,
          password,
          passwordConfirm,
        })
        .then(({ data }) => {
          setCookie('token', data.token);
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.token}`;
          handleLogin(data.data.user);
        })
        .catch((err) => {
          if (password !== passwordConfirm)
            return toast('Passwords are not the same.');
          toast(
            'A user already exists with that name. Please choose another one'
          );
        });
    }
  };

  const toggleLogInSignUp = () => {
    loginOrSignup === 'login' ? setLogOrSign('signup') : setLogOrSign('login');
  };

  return (
    <div
      className="nes-container is-dark"
      style={{
        padding: '5%',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: '70%',
        }}
      >
        <div
          style={{
            backgroundColor: '#212529',
            padding: '1rem 0',
          }}
          onChange={toggleLogInSignUp}
        >
          <label>
            <input
              type="radio"
              className="nes-radio is-dark"
              name="answer-dark"
              defaultChecked
            />
            <span>Log In</span>
          </label>

          <label>
            <input
              type="radio"
              className="nes-radio is-dark"
              name="answer-dark"
            />
            <span>Sign Up</span>
          </label>
        </div>
        <div
          style={{ backgroundColor: '#212529', padding: '1rem' }}
          className="nes-field"
        >
          <label style={{ color: '#fff' }} htmlFor="name_field">
            Name
          </label>
          <input
            type="text"
            id="name_field"
            className="nes-input is-dark"
            onChange={(e) => setName(e.target.value)}
          />

          <label style={{ color: '#fff' }} htmlFor="password_field">
            Password
          </label>
          <input
            type="password"
            id="password_field"
            className="nes-input is-dark"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginOrSignup === 'signup' && (
            <>
              <label style={{ color: '#fff' }} htmlFor="password_confirm_field">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password_field"
                className="nes-input is-dark"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </>
          )}
        </div>
        <Button onClick={getToken}>
          {loginOrSignup === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </div>
    </div>
  );
};

export default LoginSignUp;
