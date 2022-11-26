import React,{useState,useRef,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import {login,checkUsername} from './getData'
import {Form,FormGroup,Input,Label,FormFeedback} from "reactstrap"

export const Login = ({setLoggedInUser}) => {
    const navigate = useNavigate()
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
    const [isValidU,setIsValidU] = useState(null)
    const [isValidP,setIsValidP] = useState(null)
    const [serverError,setServerError]= useState(null)

    const mutationLogin = useMutation(login, {
      onError:(err)=>{
        console.log(err.response.status)
        setIsValidP(false)
  
      },
      onSuccess: (data) => {
        console.log("az adat:",data.data)
       // if(data.data.rowCount==1){//csak az ideiglenes loginnal volt jó
       
        if(data.data?.username){
          const {username,email,avatar,avatar_id}=data.data
          setLoggedInUser({username:username,email:email,avatar:avatar,avatar_id:avatar_id})
          navigate('/')
        }else
          setIsValidP(false)
      }    
  })
  const mutationCheckUsername = useMutation(checkUsername, {
    onSuccess: (data) => {
      console.log(data.data)
      data.data?.error ? setServerError(data.data.error) : setServerError(null)
      data.data?.rowCount==1? setIsValidU(true):setIsValidU(false)
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

  return (
    <Form className="login border p-3 shadow mt-1 rounded">
        <h3>Login form</h3>
      <FormGroup>
        <Label for="username">Felhasználónév:</Label>
        <Input className={isValidU==null? "" :( isValidU ? "is-valid" : "is-invalid")}
            autoFocus
            value={username} onChange={(e)=>setUsername(e.target.value)}
            onBlur={handleCheckUsername}
            onKeyPress={(e)=>e.key === "Enter"?  document.getElementById("password").focus(): ""}
        />
        {!serverError && <FormFeedback>Nem létező felhasználónév!!!</FormFeedback>}
        {serverError && <FormFeedback >Szerver hiba!!!<small>{serverError.code}</small></FormFeedback>}
      </FormGroup>
      
      <FormGroup>
        <Label for="password">Jelszó:</Label>
        <Input id="password" type="password" className={isValidP==null? "" : (isValidP ? "is-valid" : "is-invalid")}
            value={password} onChange={(e)=>setPassword(e.target.value)}
            onKeyPress={(e)=>e.key === "Enter"?  document.getElementById("submit").focus(): ""}
        />
          <FormFeedback >Helytelen jelszó!</FormFeedback>
          {/*serverError && <FormFeedback >Szerver hiba!!!<small>{serverError.code}</small></FormFeedback>*/}          
      </FormGroup>
      <div>
        <Input id="submit" type="button" disabled={!username || !password} color="dark"
          onClick={()=>mutationLogin.mutate({username:username,password:password})}
          value="Login"/>
      </div>
    </Form>
  );
};
