import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { person } from '../../../lib/types'
import PersonEdit from './PersonEdit'

function AddPersonCard(props:{add:(arg:person)=>void}){
    const [isOpen, setOpen] = useState(false)

    function onClose(){
        setOpen(false)
    }

    return(
        <>
        {isOpen? 
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Address to Book</ModalHeader>
                    <ModalCloseButton />
                    <PersonEdit onClose={onClose} add={props.add} />
                </ModalContent>
            </Modal>
            :
            <div className='address-card' onClick={() => setOpen(true)}>
                <button>Add Address</button>
                </div>}
                </>
    )
}

export default AddPersonCard