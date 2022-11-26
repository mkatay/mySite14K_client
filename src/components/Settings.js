import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { validateImage } from "image-validator";
import FileDrop from './FileDrop'


export const Settings=({loggedInUser})=> {
  
  const [successful,setSuccessFul]=useState(false)
  const [msg,setMsg] =useState('')
  const [selFile,setSelFile] = useState({})
 

  const onUpdateSubmit =async () =>{
    if(selFile.length>0){
      const isValidImage = await validateImage(selFile[0]);
      isValidImage && sendData(`/auth/updateUserData/${user.userId}`)//amikor megvan a válasz csak akkor menjen a kérés a szerverre
    }
  } 
  
  const sendData=async (url) =>{
    setUpdateing(true)
    const formData=new FormData()
    if(selFile.length>0)
        formData.append('image',selFile[0])
    formData.append('story',story)
    try {
      const resp=await axios.put(url,formData)
      const data=await resp.data
      setMsg(data.message)
      if(resp.status===200){
          setSuccessFul(true)
         
          if(data.avatar)
            user.avatar=data.avatar
          updateUser(user)
          setUpdateing(false)
      }else
        setSuccessFul(false)  
    }catch(e){
      setSuccessFul(false)
      setMsg(`'Fájlfeltöltési hiba' : ${e.message}`)
    }
  }

  return (
    <div className="row justify-content-center mx-auto w-75 write" >
  
            <img src={user.avatar?user.avatar:'user.png'} alt="avatar" className="  border rounded-3 avatar" />

            <form >
                <div className="d-flex align-items-center justify-content-between"> 

                    <div className="files">
                          <FileDrop setSelFile={setSelFile} setMsg={setMsg}/>
                    </div>
                  
                  {msg?<div>{msg}</div>:''}
                </div>
            
            </form>
            <button className="btn btn-primary m-2" onClick={onUpdateSubmit} > mentés </button>
           {/* <button  className="btn btn-danger m-2" onClick={onDeleteSubmit} > felhasználói fiók TÖRLÉSE </button>*/}

    </div>
  )
}
