import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import classNames from "classnames";
import axios from "axios";
import { useState } from "react";

import "./LogInLogic.scss";
import { addRegistrationAction } from "../../../app/slice/RegistrSlice";

export const LogInLogic = () => {
  const languageReducer = useAppSelector((state) => state.language);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    email: '',  
    emailUkr: '',
    password: '', 
    passwordUkr: '', 
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleInputChange = (field, event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });

    setErrors({
      email: '',  
      emailUkr: '',
      password: '', 
      passwordUkr: '', 
    });
  };

  const handlePasswordChange = (event) => {
    setValues({
      ...values,
      password: event.target.value,
    });

    setErrors({
      email: '',  
      emailUkr: '',
      password: '', 
      passwordUkr: '', 
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/user/login/', {
        email: values.email,
        password: values.password,
      })
      .then(response => {
        dispatch(addRegistrationAction({
          access: response.data.access,
          refresh: response.data.refresh,
        }))
      })
   
      navigate('/');

    } catch (error) {
      setErrors({
        email: 'An error occurred during login.',
        emailUkr: 'При вході виникла помилка.',
        password: 'An error occurred during login.',
        passwordUkr: 'При вході виникла помилка.',
      });
    }
  };

  return (
    <div className="signUpLogic">
       <h1 className="signUpLogic__header">
        {languageReducer.language
          ? 'Log in'
          : 'Вхід'}
      </h1>

      <div className="signUpLogic__container">
      <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Email address*'
              : 'Адреса електронної пошти*'}
          </p>

          <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
          
          <input
            type="email"
            className={classNames("signUpLogic__input", {
              'signUpLogic__error': errors.email.length > 0,
            })}
            placeholder={
              languageReducer.language
                ? 'Enter your email address'
                : 'Введіть вашу адресу електронної пошти'
            }
            value={values.email}
            onChange={(event) => handleInputChange('email', event)}
          />
        </label>
        
        {errors.email && (
          <div className="signUpLogic__errorText">
            {
              languageReducer.language 
              ? errors.email
              : errors.emailUkr
            }
          </div>
          )}
        </div>

        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Password*'
              : 'Пароль*'}
          </p>

          <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
          
          <input
            type={values.showPassword ? 'text' : 'password'}
            className={classNames("signUpLogic__input", {
              'signUpLogic__error': errors.password.length > 0,
            })}
            placeholder={
              languageReducer.language
                ? 'Enter your password'
                : 'Введіть пароль'
            }
            onChange={handlePasswordChange}
          />
        
        <button
            onClick={handleClickShowPassword}
            className={classNames('signUpLogic__button', {
              'signUpLogic__show': values.showPassword,
            })}
          />
        </label>

        {errors.password && (
          <div className="signUpLogic__errorText">
            {
              languageReducer.language 
              ? errors.password
              : errors.passwordUkr
            }
          </div>
          )}
        </div>
      </div>
        
      <div className="signUpLogic__container">
        <button
          className='signUpLogic__green signUpLogic__button2'
          onClick={handleLogin}
        >
          {languageReducer.language
            ? 'Confirm'
            : 'Продовжити'}
        </button>

        {/* <p className="signUpLogic__or">
          {languageReducer.language
            ? 'or'
            : 'або'}
        </p>

        <button className='signUpLogic__white signUpLogic__button2'>
          <p className='signUpLogic__google signUpLogic__img' />
          {languageReducer.language
            ? 'Sign up with Google'
            : 'Зареєструватися через Google'}
        </button>

        <button className='signUpLogic__white signUpLogic__button2'>
          <p className='signUpLogic__facebook signUpLogic__img' />
          {languageReducer.language
            ? 'Sign up with Facebook'
            : 'Зареєструватися через Facebook'}
        </button> */}
      </div>

      <div className="signUpLogic__container2">
        <div className="signUpLogic__text2">
          {languageReducer.language
            ? ' Don\'t have an account?'
            : 'Якщо немаєте акаунта?'}
        </div>

        <NavLink to='/singUp' className="signUpLogic__logIn">
          {languageReducer.language
            ? 'Sing up'
            : 'Зареєструватися'}
        </NavLink>
      </div>
    </div>
  );
}