import React,{useState} from "react";
import {Form,FormGroup,Input,Label,Col,Spinner,Button} from "reactstrap"
import { FileDrop } from "./FileDrop";
import {updateAvatar} from './getData'
import { useMutation } from 'react-query';
import { MyModal } from "./MyModal";



export const UserProfile = ({loggedInUser,setLoggedInUser}) => {
  //console.log('userProfile:',loggedInUser)
  const [newPassword,setNewPassword] =useState('')
  const [selFile,setSelFile] = useState({})
  const [msg,setMsg] = useState('')
  const [isUploading,setIsUploading] = useState(false)
  const [modal, setModal] = useState(false);
  const [modalChoice,setModalChoice] = useState(false);

  //console.log(selFile)

const mutationAvatar = useMutation(updateAvatar, {
  onError:(err)=>{
    console.log(err.response.status)
  },
  onSuccess: (data) => {
      console.log("az adat:",data.data)
      setMsg(data.data.message)
      setIsUploading(false)
      setLoggedInUser({...loggedInUser,avatar:data.data.avatar,avatar_id:data.data.avatar_id})
    }  
})

const handleUpdateAvatar=()=>{
  const formData = new FormData();
  formData.append("selFile", selFile);
  formData.append("username", loggedInUser.username)
  formData.append("avatar_id", loggedInUser.avatar_id)
  setIsUploading(true)
  mutationAvatar.mutate(formData)
}
const handleDelete=()=>{
    setModal(true)
    if(modalChoice)
      console.log("itt kell küldeni a kérést a szerver fele a felhasználói fiók törléséhez!")
}

  return (
    <div className="userprofile border p-2 shadow">
      <h6 className="text-center">Felhasználói fiók</h6>
       <div className="row border p-1 " >
            <span className="col-2"> Email:</span>
            <span className="col-10">{loggedInUser.email}</span>
            <span>Avatar:</span>
            <span className="col-12 text-center img-thumbnail"><img src={loggedInUser.avatar} alt="avatar" style={{maxWidth:"300px"}} /></span>
        </div>
      <Form>
       
        <FormGroup row className="border p-1  bg-light m-0">
          <Label for="password" sm={12}>New password:</Label>
          <Col sm={8}>
            <Input id="password" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
          </Col>
          <Col sm={4}>
            <Input type="button" disabled={!newPassword} className="btn btn-outline-primary m-1" 
              onChange={()=>console.log('jelszócsere')}
              value="Update pw" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <FileDrop setSelFile={setSelFile}/>
        </FormGroup>

        <FormGroup row className="justify-content-center">
          <Col sm={5}>
          {! isUploading ? (<Input value="Update avatar" className="btn btn-primary m-1"
                disabled={!selFile}
                onClick={handleUpdateAvatar}
            />)
           : (<Button  color="primary"  disabled>
              <Spinner size="sm">UpLoading...</Spinner>
              <span>{' '}UpLoading</span>
            </Button>)}
          </Col>
          <Col sm={5}>
            <Input type="button" className="btn btn-danger m-1" 
                onClick={handleDelete}
              value="Delete My profile" />
          </Col>
        </FormGroup>
      </Form>
      <div className="msg">{msg}</div>
      {modal && <MyModal modal={modal} setModal={setModal} username={loggedInUser.username} setLoggedInUser={setLoggedInUser}/>}
    </div>
  );
};
