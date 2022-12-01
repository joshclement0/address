import React, { useContext, useEffect, useState } from 'react'
import userContext from '../../lib/context/authcontext'
import { person } from '../../lib/types'
import { getAddresses } from '../../lib/util/server'

import AddPersonCard from './components/AddPersonCard'
import PersonCard from './components/PersonCard'

function AddressBook(){
    const [personList, setpersonList] = useState<person[]>([])
    const { userID,isLoggedIn } = useContext(userContext)
    
    function addPersonToList(person:person){
        let newlist = [...personList,person]
        setpersonList(newlist)
    }
    useEffect(()=>{
        if (!isLoggedIn) return
        getAddresses(userID,(ret:person[])=>{
            setpersonList(ret)
        })
        
    },[])
    return (
        <div>
            {personList.map((person)=>
                <PersonCard {...person} key={Math.random()}></PersonCard>
            )}
            <AddPersonCard add={addPersonToList}/>
        </div>)
}

export default AddressBook