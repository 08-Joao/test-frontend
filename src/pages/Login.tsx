import axios from 'axios'
import React from 'react'

function Login() {
    const logIn = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
            email: "maumau@gmail.com",
            password: "pass123"
        },
        {
            withCredentials: true
        })
        .then((res) => console.log(res.data))
    }

    const changePass = async () => {
        await axios.put(`${import.meta.env.VITE_API_URL}/user/update`, {
            password: "pass123",
            phone: "(11)99999-9999"
        },
        {
            withCredentials: true
        })
        .then((res) => console.log(res.data))
    }

  return (
    <>
    <button onClick={logIn}>
        Blablabla
    </button>
    <button onClick={changePass}>
        Change Pass
    </button>
    </>
    
  )
}

export default Login

