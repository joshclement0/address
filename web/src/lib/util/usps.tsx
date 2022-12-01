const xmlbuilder2 = require('xmlbuilder2')
const URL = "https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&xml="

export function getCityStateFromZip(zip:number,callback:(arg0: {Zip5:string,City:string,State:string})=>void ) {

    let root = xmlbuilder2.create({version:'1.0'})
        .ele('CityStateLookupRequest',{USERID: '899SKALA5321'})
            .ele('ZipCode')
                .ele('Zip5').txt(zip).up()
            .up()
        .up()
    let xml = root.end({prettyPrint:true})
    let url = URL+encodeURIComponent(xml)

    fetch(url).then(ret=>{
        ret.text().then(text=>
        {
            const obj = xmlbuilder2.convert(text,{format:"object"})
            if( obj.CityStateLookupResponse.ZipCode.Error ) return
            callback(obj.CityStateLookupResponse.ZipCode)
        })
    })
}
