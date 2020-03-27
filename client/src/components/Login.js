import React, {useState} from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  let [form, setForm] = useState({username: '', password: ''});


  let signIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', form)
    .then(res => {
      window.localStorage.setItem('user-auth', res.data.payload);
      props.history.push('/bubble');
      props.history.go();
    })
    .catch(err => {
      window.alert(err);
    }) 
  }

  let handleChange = (e) => {
    switch(e.target.id) {
      case 'username':
        setForm({...form, username: e.target.value})
      break;
      case 'password':
      setForm({...form, password: e.target.value})
      break;
    }
  }

  return (
    <>
    <p className='title'>Bubble Bonanza!</p>
    <form onSubmit={signIn} className='loginForm'>
      <input type='text' id='username' placeholder='Lambda School' required={true} onChange={handleChange}/>
      <input type='password' id='password' placeholder='i<3Lambd4' required={true} onChange={handleChange}/>
      <button className='btn btn-success' type='submit'>Login</button>
    </form>
    </>
  );
};

export default Login;
