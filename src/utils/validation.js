export const validation = (fieldName, value, setFormValid, formValid, password) => {
  const {
    formErrors,
    // usernameValid,
    // usernameBlur,
    // passwordBlur,
    // fullNameBlur,
    // passwordConfirmBlur,
    // fullNameValid,
    // passwordConfirmValid,
    // passwordValid,
  } = formValid;
  switch (fieldName) {
    case 'username':
      if (value.length === 0) {
        setFormValid({
          ...formValid,
          usernameBlur: false,
          usernameValid: false,
          formErrors: { ...formErrors, username: 'Trường này không được bỏ trống' },
        });
      } else if (value.length < 3) {
        setFormValid({
          ...formValid,
          usernameBlur: false,
          usernameValid: false,
          formErrors: { ...formErrors, username: 'Tên đăng nhập ít nhất là 3 kí tự' },
        });
      } else {
        setFormValid({
          ...formValid,
          usernameBlur: false,
          usernameValid: true,
          formErrors: { ...formErrors, username: '' },
        });
      }
      break;

    case 'fullName':
      if (value.length === 0) {
        setFormValid({
          ...formValid,
          fullNameBlur: false,
          fullNameValid: false,
          formErrors: { ...formErrors, fullName: 'Trường này không được bỏ trống' },
        });
      } else {
        setFormValid({
          ...formValid,
          fullNameBlur: false,
          fullNameValid: true,
          formErrors: { ...formErrors, fullName: '' },
        });
      }
      break;
    case 'password':
      if (value.length === 0) {
        setFormValid({
          ...formValid,
          passwordBlur: false,
          passwordValid: false,
          formErrors: { ...formErrors, password: 'Bạn chưa nhập mật khẩu' },
        });
      } else if (value.length < 5) {
        setFormValid({
          ...formValid,
          passwordBlur: false,
          passwordValid: false,
          formErrors: { username: formErrors.username, password: 'Mật khẩu ít nhất là 5 kí tự' },
        });
      } else {
        setFormValid({
          ...formValid,
          passwordBlur: false,
          passwordValid: true,
          formErrors: { ...formErrors, password: '' },
        });
      }
      break;

    case 'passwordConfirm':
      if (value.length === 0) {
        setFormValid({
          ...formValid,
          passwordConfirmBlur: false,
          passwordConfirmValid: false,
          formErrors: { ...formErrors, passwordConfirm: '' },
        });
      } else if (value !== password) {
        setFormValid({
          ...formValid,
          passwordConfirmBlur: false,
          passwordConfirmValid: false,
          formErrors: { ...formErrors, passwordConfirm: 'Không trùng với mật khẩu đã nhập' },
        });
      } else {
        setFormValid({
          ...formValid,
          passwordConfirmBlur: false,
          passwordConfirmValid: true,
          formErrors: { ...formErrors, passwordConfirm: '' },
        });
      }
      break;
    default:
      break;
  }
};

export const setOnFocus = (event, setFormValid, formValid, password) => {
  switch (event.target.name) {
    case 'username':
      validation(event.target.name, event.target.value, setFormValid, formValid, password);
      break;
    case 'password':
      validation(event.target.name, event.target.value, setFormValid, formValid, password);
      break;
    case 'fullName':
      validation(event.target.name, event.target.value, setFormValid, formValid, password);
      break;
    case 'passwordConfirm':
      validation(event.target.name, event.target.value, setFormValid, formValid, password);
      break;
    default:
      break;
  }
};
