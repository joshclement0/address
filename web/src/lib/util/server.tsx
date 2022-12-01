import { person } from "../types";
// const source = 'http://localhost:5001'
const source = 'http://localhost:8000'

export function getAddresses(id:number,callback:(ret:person[])=>void){
    fetch(source+'/addressbook?id='+id).then(r=>r.json().then(
        (resp)=>{
            callback(resp.data);
        }
        ))
}

export function addAddress(id:number,person:person,callback:(arg:Response)=>void){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    };
    fetch(source+'/addressbook?id='+id,requestOptions).then(r=>r.json()).then(
        (response)=> {
            if (response.message==='Success') callback(response)}
    )
}