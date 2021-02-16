import React, {useState} from "react";
import { loginUser } from "../../actions/authActions";

const Login = () => {
  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password
    }

    loginUser(data)
  }
  return (
    <div>
      <form>
        <input value={email} onChange={(value) => setEmail(value.target.value)} placeholder="email" />
        <input value={password} onChange={(value) => setPassword(value.target.value)} placeholder="Mot de passe" />
        <button onClick={(e) => submitForm(e)} >Valider</button>
      </form>
    </div>
  );
};

export default Login;
