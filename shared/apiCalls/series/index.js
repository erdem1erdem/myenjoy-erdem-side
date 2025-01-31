import { domainUrl } from "../../constants"

const createSeriesUrl= (payload)=>{
    
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")       
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(payload)
    }
    return (
        fetch(domainUrl + `/createSeriesUrl`, requestOptions)
        .then(response => response.json())
        .then(result => {    
            if (result?.success)                   
                return result?.url
            else
                throw result?.message
        })
        .catch(error => { 
            console.error(error)
            return 0 
        })
    )
}


const series={
    createSeriesUrl,
}
export {series}