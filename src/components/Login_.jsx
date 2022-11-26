import React,{useState} from 'react'
import {Form,FormGroup,Input,FormFeedback,Button,Label} from 'reactstrap'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {login,checkUsername} from './getData'

export const Login=()=> {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [isValidU,setIsValidU]=useState(null)
    const [isValidP,setIsValidP]=useState(null)

    const navigate=useNavigate()

    const mutationLogin = useMutation(login, {
      onSuccess: (data) => {
        console.log("az adat:",data.data)
        data.data.rowCount==1? setIsValidP(true):setIsValidP(false)
        
      }
  })

  const mutationCheckUsername = useMutation(checkUsername, {
    onSuccess: (data) => {
      console.log(data.data.rowCount)
      data.data.rowCount==1? setIsValidU(true):setIsValidU(false)
      
    }
})

  return (
    <Form className="border p-3 shadow">
        <h3>Login form</h3>
        <FormGroup>
          <Label for="username">Felhasználónév:</Label>
          <Input  value={username} onChange={(e)=>setUsername(e.target.value)}
              onBlur={()=>mutationCheckUsername.mutate({username:username})}
              className={isValidU==null ? "":(isValidU?"is-valid":"is-invalid")}
          />
          <FormFeedback>Nincs ilyen felhasználónév!</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Jelszó:</Label>
          <Input  type="password" value={password} 
              onChange={(e)=>setPassword(e.target.value)}
              className={isValidP==null ? "":(isValidP?"is-valid":"is-invalid")}
          />
          <FormFeedback >Hibás felhasználónév/jelszó páros!</FormFeedback>
        </FormGroup>
        <Button color="dark"  disabled={!username || !password}
              onClick={() => mutationLogin.mutate({username: username, password: password})}>Login</Button>
      </Form>
  )
}
