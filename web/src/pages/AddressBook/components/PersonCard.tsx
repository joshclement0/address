import React from 'react'
import { person } from '../../../lib/types'

function PersonCard(props: person){
  const name = props.name
  const address = props.address
  const city = props.city
  const zipcode = props.zipcode
  const state = props.state
  const country = props.country


  return(
    <div className='address-card' style={{textAlign: "left"}}>
      <h1>{name}</h1>
      <p className='address-info'>{address}</p>
      <p className='address-info'>{city}, {state} {zipcode}</p>
      {country ? <p className='address-info'>{country}</p> : ''}
    </div>
  )
}
export default PersonCard