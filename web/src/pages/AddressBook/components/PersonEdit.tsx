import { Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, NumberInput, NumberInputField } from "@chakra-ui/react"
import { useContext, useState } from "react"
import userContext from "../../../lib/context/authcontext"
import { person } from "../../../lib/types"
import { addAddress } from "../../../lib/util/server"
import { getCityStateFromZip } from "../../../lib/util/usps"

function PersonEdit(props:{onClose:()=> void,add:(arg:person)=>void}){
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [zipcode,setZipCode] = useState('')
    const [country,setCountry] = useState('')

    const { userID,isLoggedIn } = useContext(userContext)

    function submit(){
        if (!isLoggedIn) return
        addAddress(userID,{name,address,city,state,zipcode,country},(resp)=>{
            props.add({name,address,city,state,zipcode,country})
            props.onClose()
        })
        
    }
    function checkZipCode(e:string){
        setZipCode(e)
        if (e.length==5 && city==='' && state===''){
            getCityStateFromZip(parseInt(e),(resp)=>{
                setState(resp.State)
                setCity(resp.City)
            })
        }
    }
    return(
    <>
        <ModalBody>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type='text' value={name} onChange={(e)=>setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input type='text' value={address} onChange={(e)=>setAddress(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>ZipCode</FormLabel>
                <NumberInput>
                    <NumberInputField onChange={e=>checkZipCode(e.target.value)}/>
                </NumberInput>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input type='text' value={city} onChange={(e)=>setCity(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input type='text' value={state} onChange={(e)=>setState(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Country</FormLabel>
                <Input type='text' value={country} onChange={(e)=>setCountry(e.target.value)} />
            </FormControl>
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={props.onClose}>
                Close
            </Button>
            <Button colorScheme='blue' onClick={submit}>Add</Button>
        </ModalFooter>
    </>
    )
}

export default PersonEdit