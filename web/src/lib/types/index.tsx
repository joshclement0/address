type person={
    name:string,
    address:string,
    city:string,
    zipcode:string,
    state:string,
    country:string
}
type address={
    streetName:string
    state:string
    country:string
}

export {
    type address,
    type person
}