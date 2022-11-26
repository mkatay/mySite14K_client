import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {deleteUser} from './getData'
import { useMutation } from 'react-query';

export const MyModal=({modal,setModal,setLoggedInUser,username})=> {
  
    const mutationDelete = useMutation(deleteUser, {
        onError:(err)=>{
          console.log(err.response.status)
        },
        onSuccess: (data) => {
            console.log("az adat:",data.data)
            setLoggedInUser({})
          }  
      })

  const toggle = () => setModal(!modal);
  const toggleDelete = () =>{
    console.log('kell törölni a felhasználót:',username);
    mutationDelete.mutate({username:username})
    setModal(!modal);
    
  } 
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Figyelem!!!</ModalHeader>
        <ModalBody>Biztosan ki akarod törölni a felhasználói fiókodat?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleDelete}>Igen</Button>{' '}
          <Button color="primary" onClick={toggle}>Mégsem</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

