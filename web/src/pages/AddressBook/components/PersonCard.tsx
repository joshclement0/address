import React from 'react'

interface FullName {
  name: string,
  address: string,
  city: string,
  zipcode:string,
  state:string,
  country:string
}
function PersonCard(props:FullName){
    const name = props.name
    const address = props.address
    const city = props.city
    const zipcode = props.zipcode
    const state = props.state
    const country = props.country


    return(
        <div className='address-card' style={{textAlign:"left"}}>
            <h1>{name}</h1>
            <p className='address-info'>{address}</p>
            <p className='address-info'>{city}, {state} {zipcode}</p>
            {country?<p className='address-info'>{country}</p>:''}
        </div>
    )
}
export default PersonCard