import { domainUrl } from "../../constants"

const addHiddenCategories= (payload)=>{
    console.log("Payload:",payload)
    
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")       
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(payload)
    }
    return (
        fetch(domainUrl + `/storeHiddenCategories`, requestOptions)
        .then(response => response.json())
        .then(result => {    
            if (result?.success)                   
                return 1
            else
                throw result?.message
        })
        .catch(error => { 
            console.error(error)
            return 0 
        })
    )
}
const addToFavorite= (payload)=>{
    
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")       
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(payload)
    }
    fetch(domainUrl + `/addToFavourite`, requestOptions)
    .then(response => response.json())
    .then(result => { 
        if (result?.success)                   
            return 1
        else
            throw result?.message
    })
    .catch(error => { 
        console.error(error)
        return 0 
    })
}
const lockUnLockChannel= (payload)=>{

    console.log("Lock Channel Payload:",payload)
    
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")       
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(payload)
    }
    return (
        fetch(domainUrl + `/setLockChannel`, requestOptions)
        .then(response => response.json())
        .then(result => { 
            if (result?.success) {
                return result?.message
            }                  
            else
                throw result?.message
        })
        .catch(error => { 
            console.error(error)
            return 0 
        })
    )
}
const resetPin= (payload)=>{
   
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")       
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(payload)
    }
    return (
        fetch(domainUrl + `/resetPin`, requestOptions)
        .then(response => response.json())
        .then(result => { 
            
            if (result?.success) {
                return 1
            }                  
            else
                throw result?.message
        })
        .catch(error => { 
            console.error(error)
            return error
        })
    )
}

const checkPin= (payload)=>{
   try{
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")       
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(payload)
    }
    return (
        fetch(domainUrl + `/checkPin`, requestOptions)
        .then(response => response.json())
        .then(result => { 
          
            if (result?.success) {
                return 1
            }                  
            else
                throw result?.message
        })
        .catch(error => { 
            console.error(error)
            return error
        })
    )
   }catch(error){
    console.log(error)
   }
}
const saveMediaState= (payload)=>{
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")       
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(payload)
    }
    fetch(domainUrl + `/saveMediaState`, requestOptions)
    .then(response => response.json())
    .then(result => { 
        if (result?.success) {
            return result?.message
        }                  
        else
            throw result?.message
    })
    .catch(error => { 
        console.error(error)
        return 0 
    })
}

const saveSettings = (payload)=>{
        var myHeaders = new Headers();
       
        myHeaders.append("Content-Type", "application/json") 
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        }
        fetch(domainUrl + "/saveSetting", requestOptions)
        .then(response => response.json())
        .then(result => {
          
            if (result?.success) {
               return result?.message
            }      
            else 
                throw result?.message
        })
        .catch(error => { 
           
            console.error(error) 
        })
}

const resetSettings = (payload)=>{
    
         var myHeaders = new Headers()
        
         myHeaders.append("Content-Type", "application/json") 
         var requestOptions = {
             method: 'POST',
             headers: myHeaders,
             body:JSON.stringify(payload)
         }
         fetch(domainUrl + "/resetSetting", requestOptions)
         .then(response => response.json())
         .then(result => {
           
             if (result?.success) {
                return result
             }      
             else 
                 throw result?.message
         })
         .catch(error => { 
            
             console.error(error) 
         })
 }

const other={
    addHiddenCategories,
    addToFavorite,
    lockUnLockChannel,
    checkPin,
    resetPin,
    saveMediaState,
    saveSettings,
    resetSettings
}
export {other}