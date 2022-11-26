import React,{useState} from 'react'
import {Form,FormGroup,Input,FormFeedback,Button,Label,FormText} from 'reactstrap'

export const Register=()=>{
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')

  return (
    <Form className="border p-3 shadow">
    <h3>Register form</h3>
    <FormGroup>
      <Label for="username">Felhasználónév:</Label>
      <Input valid value={username} onChange={(e)=>setUsername(e.target.value)}/>
      <FormFeedback>Foglalt felhasználónév!</FormFeedback>
    </FormGroup>
    <FormGroup>
      <Label for="email">Email cím:</Label>
      <Input type="email" valid value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <FormFeedback>Már van ilyen email cím a nyílvántartásban!</FormFeedback>
    </FormGroup>
    <FormGroup>
      <Label for="password">Jelszó:</Label>
      <Input invalid type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <FormFeedback >Túl rövid a jelszó!</FormFeedback>
      <FormText>A jelszó minimum 6 karakter hosszúságú legyen!</FormText>
    </FormGroup>
    <Button color="dark"  disabled={!username || !password}
          /*   onPress={() => mutation.mutate({
                username,
                password
            })}
                loading={mutation.isLoading}*/
            >Login</Button>
  </Form>
  )
}
