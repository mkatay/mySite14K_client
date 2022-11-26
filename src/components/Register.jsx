import React,{useState} from "react";
import { validate } from 'react-email-validator';

import {Form,FormGroup,Input,Label,FormFeedback,Button,FormText} from "reactstrap"
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import {checkEmail,checkUsername,register} from './getData'

/*const initialState = {
  username: "",
  email: "",
  password: "",
  isValidU:null,
  isValidP:null,
  isValidE:null
}*/

export const Register = () => {
  //const [{username,email,password,isValidU,isValidP,isValidE},setState]=useState(initialState)
    const navigate=useNavigate()
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
    const [email,setEmail] =useState('')
    const [isValidU,setIsValidU] = useState(null)
    const [isValidP,setIsValidP] = useState(null)
    const [isValidE,setIsValidE] = useState(null)
    const [serverError,setServerError]= useState(null)
    const [msg,setMsg]= useState(null)
    const [success,setSuccess]= useState(null)

    const mutationCheckUsername = useMutation(checkUsername, {
      onSuccess: (data) => {
        console.log(data.data)
        data.data?.error ? setServerError(data.data.error) : setServerError(null)
        data.data?.rowCount==1? setIsValidU(false):setIsValidU(true)
      }
  })
  const handleCheckUsername=() => {
    if(username)
        mutationCheckUsername.mutate({username:username})
    else{
      //nem küldjük ebben az esetben a szerver fele a kérést
      console.log("kliens oldali ellenőrzés!!")
      setIsValidU(false)
    }
  }
  const mutationCheckEmail = useMutation(checkEmail, {
    onSuccess: (data) => {
      console.log(data.data)
      data.data?.error ? setServerError(data.data.error) : setServerError(null)
      data.data?.rowCount==1? setIsValidE(false):setIsValidE(true)
    }
})
const handleCheckEmail=() => {
  if(validate(email))
      mutationCheckEmail.mutate({email:email})
  else{
    //nem küldjük ebben az esetben a szerver fele a kérést
    console.log("kliens oldali ellenőrzés!!")
    setIsValidE(false)
  }
}
const handleCheckPassword=()=>{
  if(password.length<6)
      setIsValidP(false)
}

const mutationRegister = useMutation(register, {
  onSuccess: (data) => {
    console.log("az adat:",data.data)
    if(data.data?.id){ 
      setSuccess(true)
      setUsername('')
      setEmail('')
      setPassword('')
      setIsValidU(null)
      setIsValidP(null)
      setIsValidE(null)
    }
    setMsg(data.data.message)
  }    
})
  return (
    <Form className="login border p-3 shadow mt-1 rounded">
        <h3>Sign Up form</h3>
      <FormGroup>
        <Label for="username">Felhasználónév:</Label>
        <Input value={username} 
            autoFocus
            onChange={(e)=>setUsername(e.target.value)}
            className={isValidU==null? "" : (isValidU ? "is-valid" : "is-invalid")}
            onBlur={handleCheckUsername}
            onKeyPress={(e)=>e.key === "Enter"?  document.getElementById("email").focus(): ""}
        />
        <FormFeedback>Már létező felhasználónév!!!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email cím:</Label>
        <Input type="email" value={email} id="email"
            onChange={(e)=>setEmail(e.target.value)}
            className={isValidE==null? "" : (isValidE ? "is-valid" : "is-invalid")}
            onBlur={handleCheckEmail}
            onKeyPress={(e)=>e.key === "Enter"?  document.getElementById("password").focus(): ""}
        />
        <FormFeedback>Létező email cím!!! / Helytelen email Cím!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="password">Jelszó:</Label>
        <Input type="password" value={password} id="password"
            onChange={(e)=>setPassword(e.target.value)}
            className={isValidP==null? "" : (isValidP ? "is-valid" : "is-invalid")}
            onBlur={handleCheckPassword}
        />
        <FormFeedback >Helytelen jelszó!</FormFeedback>
        <FormText>A jelszó minimum 6 karakter hosszú legyen!</FormText>
      </FormGroup>
      <div>
        <Input type="button"  disabled={!username || !password || !email} 
            color="dark"
            value="Sign Up"
            onClick={()=>mutationRegister.mutate({username:username,email:email,password:password})}
        />
      </div>
      <div className="text-info">{msg}</div>
      {success && <div className="btn btn-outline-dark" onClick={()=>navigate('/login')}>Jelentkezz be</div>}
    </Form>
  );
};
