import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import config from '~/config';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '~/components/Spinner';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/img';

import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { ToastContext } from '~/contexts/ToastContext';
import Toast from '~/components/Toast';

const cx = classNames.bind(styles);

function Login() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });

  const [formValid, setFormValid] = useState({
    usernameBlur: null,
    passwordBlur: null,
    usernameValid: null,
    passwordValid: null,
    formErrors: { username: '', password: '' },
  });

  const { formErrors, usernameValid, usernameBlur, passwordBlur, passwordValid } = formValid;

  const validate = (fieldName, value) => {
    switch (fieldName) {
      case 'username':
        if (value.length === 0) {
          setFormValid({
            ...formValid,
            usernameBlur: false,
            usernameValid: false,
            formErrors: { username: 'Bạn chưa nhập tên tài khoản', password: formErrors.password },
          });
        } else {
          setFormValid({
            ...formValid,
            usernameBlur: false,
            usernameValid: true,
            formErrors: { username: '', password: formErrors.password },
          });
        }
        break;
      case 'password':
        if (value.length === 0) {
          setFormValid({
            ...formValid,
            passwordBlur: false,
            passwordValid: false,
            formErrors: { username: formErrors.username, password: 'Bạn chưa nhập mật khẩu' },
          });
        } else {
          setFormValid({
            ...formValid,
            passwordBlur: false,
            passwordValid: true,
            formErrors: { username: formErrors.username, password: '' },
          });
        }
        break;

      default:
        break;
    }
  };

  const [show, setShow] = useState({
    type: 'password',
  });

  const {
    loginUser,
    authState: { authLoading, isAuthenticated },
    signInWithGoogle,
    signInWithFaceBook,
  } = useContext(AuthContext);

  const { username, password } = formValue;
  const onClickIcon = () => {
    if (show.type === 'password') {
      setShow({ type: 'text' });
    } else {
      setShow({ type: 'password' });
    }
  };

  const onChangeForm = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    validate(event.target.name, event.target.value);
  };

  const setOnBlur = (event) => {
    switch (event.target.name) {
      case 'username':
        setFormValid({
          ...formValid,
          usernameBlur: true,
        });

        break;
      case 'password':
        setFormValid({
          ...formValid,
          passwordBlur: true,
        });
        break;
      default:
        break;
    }
  };

  const setOnFocus = (event) => {
    switch (event.target.name) {
      case 'username':
        validate(event.target.name, username);
        break;
      case 'password':
        validate(event.target.name, password);
        break;
      default:
        break;
    }
  };

  const {
    toastState: { toastList },
    addToast,
  } = useContext(ToastContext);
  
  let navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(formValue);
      if (response.success) {
        navigate(config.routes.home, { replace: true });
      } else {
        addToast({
          id: toastList.length + 1,
          title: 'Thất bại',
          content: response.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (authLoading) {
    return <Spinner />;
  } else if (isAuthenticated) {
    return <Navigate to={config.routes.home} />;
  } else {
    return (
      <div className={cx('wrapper', ['grid', 'wide'])}>
        <Toast />
        <div className={cx('header')}>
          <div className={cx('inner')}>
            <div className={cx('logo-wrapper')}>
              <Link className={cx('logo')} to={config.routes.home}>
                <img src={images.logo} alt="logo" className={cx('logo-img')}></img>
              </Link>
              <p className={cx('logo-text-title')}>Nhật Bình Shop</p>
              <p className={cx('logo-text')}>Đăng Nhập</p>
            </div>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('form')}>
            <div className={cx('title')}>
              <h3> Wellcome to your home </h3>
            </div>
            <form className={cx('form-content')} onSubmit={login}>
              <div className={cx('form-group')}>
                <label htmlFor="username" className={cx('label')}>
                  Tên đăng nhập:
                </label>
                <input
                  value={username}
                  type={'text'}
                  spellCheck={false}
                  id="username"
                  onFocus={setOnFocus}
                  onBlur={setOnBlur}
                  className={cx('input', usernameBlur && !usernameValid && 'error')}
                  name={'username'}
                  onChange={onChangeForm}
                  placeholder="Tên đăng nhập"
                ></input>
                <span className={cx('form-error')}>{usernameBlur && formErrors.username}</span>
              </div>
              <div className={cx('form-group')}>
                <label htmlFor="password" className={cx('label')}>
                  Mật khẩu:
                </label>
                <div
                  className={cx(
                    'input-password',
                    passwordBlur && !passwordValid && 'error',
                    passwordBlur != null && !passwordBlur && 'active',
                  )}
                >
                  <input
                    autoComplete="true"
                    className={cx('password')}
                    value={password}
                    type={show.type}
                    onFocus={setOnFocus}
                    onBlur={setOnBlur}
                    id="password"
                    name={'password'}
                    placeholder="Mật khẩu"
                    onChange={onChangeForm}
                  />
                  <div>
                    {show.type === 'password' ? (
                      <FontAwesomeIcon icon={faEyeSlash} className={cx('icon')} onClick={onClickIcon}></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon icon={faEye} onClick={onClickIcon} className={cx('icon')}></FontAwesomeIcon>
                    )}
                  </div>
                </div>
                <span className={cx('form-error')}>{passwordBlur && formErrors.password}</span>
              </div>
              <div className={cx('button')}>
                <Button to={config.routes.home} primary className={cx('btn-back')}>
                  Quay lại
                </Button>
                {usernameValid && passwordValid ? (
                  <Button type="submit" text primary>
                    Đăng nhập
                  </Button>
                ) : (
                  <Button primary disable>
                    Đăng nhập
                  </Button>
                )}
              </div>
            </form>
            <div className={cx('footer')}>
              <div className={cx('help')}>
                <p className={cx('help-text')}>Quên mật khẩu</p>
                <p className={cx('help-text')}>Đăng nhập với SMS</p>
              </div>
              <div>
                <p className={cx('or')}>HOẶC ĐĂNG NHẬP VỚI</p>
              </div>
              <div className={cx('social')}>
                <div className={cx('social-list')} onClick={signInWithGoogle}>
                  <img className={cx('social-icon')} src={images.google} alt="" />
                  <span> Google</span>
                </div>
                <div className={cx('social-list')} onClick={signInWithFaceBook}>
                  <img className={cx('social-icon')} src={images.facebook} alt="" />
                  <span> Facebook</span>
                </div>
              </div>
              <div className={cx('change')}>
                <p className={cx('change-text')}>Bạn mới biết đến Nhật Bình Shop?</p>
                <Button to={config.routes.register} primary>
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
