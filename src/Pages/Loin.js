import { useState } from "react";
import { authService } from "../store/AuthModule/AuthService";

const loginFormTemlate = {
  email: '',
  password: '',
}
const registerFormTemplate = {
  name: '',
  surname: '',
  email: '',
  password: '',
  role: '',
}

const Login = () => {

  const [loginForm, setLoginForm] = useState(loginFormTemlate);
  const [registerForm, setRegisterForm] = useState(registerFormTemplate);
  const [register, setRegister] = useState(false);

  const toggleForm = () => {
    setRegister(!register);
  }

  const loginSubmit = async () => {
    authService.login(loginForm)
      .then(res => {
        console.log('usepo sam', res)
      })
      .catch(err => {
        console.log(err)
      }
      );
  }

  const registerAction = () => {
    console.log('registerAction', registerForm)
  };

  const loginEmailHandler = (event) => {
    setLoginForm({
      ...loginForm,
      email: event.target.value
    })
  }

  const loginPasswordHandler = event => {
    setLoginForm({
      ...loginForm,
      password: event.target.value
    })
  }

  const registerNameHandler = event => {
    setRegisterForm({
      ...registerForm,
      name: event.target.value
    })
  }

  const registerSurnameHandler = event => {
    setRegisterForm({
      ...registerForm,
      surname: event.target.value
    })
  }

  const registerEmailHandler = event => {
    setRegisterForm({
      ...registerForm,
      email: event.target.value
    })
  }

  const registerPasswordHandler = event => {
    setRegisterForm({
      ...registerForm,
      password: event.target.value
    })
  }

  const roleHandler = event => {
    setRegisterForm({
      ...registerForm,
      role: event.target.value
    })
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      {!register ?
        //login form
        <div className="flex flex-col w-4/12 border h-2/3 p-4">
          <div className="flex justify-center">
            <span className="text-3xl">Login</span>
          </div>
          <div className="flex flex-col justify-center mt-8">
            <span>Email</span>
            <input
              className="input"
              type="text"
              value={loginForm.email}
              onChange={loginEmailHandler}
            />
          </div>
          <div className="flex flex-col justify-center mt-4">
            <span>Password</span>
            <input
              className="input"
              type="password"
              value={loginForm.password}
              onChange={loginPasswordHandler}
            />
          </div>
          <div className="flex mt-4 justify-between">
            <div className="button bg-blue-500 w-1/3" onClick={loginSubmit}>Login</div>
            <div className="button bg-darkGreen w-1/3" onClick={toggleForm}>
              Register
            </div>
          </div>
        </div>
        :
        //register form
        <div className="flex flex-col w-4/12 border h-2/3 p-4">
          <div className="flex justify-center">
            <span className="text-3xl">Register</span>
          </div>
          <div className="flex flex-col justify-center mt-8">
            <span>First Name</span>
            <input
              className="input"
              type="text"
              autoComplete="off"
              value={registerForm.name}
              onChange={registerNameHandler}
            />
          </div>
          <div className="flex flex-col justify-center mt-8">
            <span>Last Name</span>
            <input
              className="input"
              type="text"
              autoComplete="off"
              value={registerForm.surname}
              onChange={registerSurnameHandler}
            />
          </div>
          <div className="flex flex-col justify-center mt-8">
            <span>Email</span>
            <input
              className="input"
              type="text"
              autoComplete="off"
              value={registerForm.email}
              onChange={registerEmailHandler}
            />
          </div>
          <div className="flex flex-col justify-center mt-8">
            <span>Password</span>
            <input
              className="input"
              type="password"
              autoComplete="new-password"
              value={registerForm.password}
              onChange={registerPasswordHandler}
            />
          </div>
          <div className="flex flex-col mt-2">
            <div>
              <input type="radio" name="student" value="student" onChange={roleHandler} />
              <label htmlFor="student">Student</label>
            </div>
            <div>
              <input type="radio" name="teacher" value="teacher" onChange={roleHandler} />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>
          <div className="flex mt-4 justify-between">
            <div className="button bg-darkRed w-1/3" onClick={toggleForm}>
              Go Back
            </div>
            <div className="button bg-darkGreen w-1/3" onClick={registerAction}>
              Register
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Login;