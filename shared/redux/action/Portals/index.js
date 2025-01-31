import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { domainUrl, localToUtc } from '../../../';


export const getPortals = createAsyncThunk('getPortals',
    async (object, { dispatch, getState }) => {
       
        dispatch(gettingPortals())
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        const payload = {macAddress: object?.macAddress}        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        }
        fetch(domainUrl + `/getAllPortals`, requestOptions)
            .then(response => response.json())
            .then(result => {  
                if (result?.success !== -1)              
                    dispatch(portalsResponse(result?.portals))
                else if (result?.success === -1)
                    dispatch(setNotRegisteredDevice())
            })
            .catch(error => {   
                dispatch(setNotRegisteredDevice())
                console.error(error) 
            })
     }
)
export const pingServer = createAsyncThunk('pingServer',
    async (_, { dispatch, getState }) => {
      
        const {macAddress}= getState()?.portals
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")      
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify({
                macAddress,
                dateTime: localToUtc()
            })
        }

        fetch(domainUrl + `/pushBoxStatis`, requestOptions)
        .then(response => response.json())
        .then(result => {           
            if (result?.success)              
                {
                   
                }     
            else 
                throw result?.message
        })
        .catch(error => { 
            console.error(error) 
        })
    }
)

export const savePortalId = createAsyncThunk('SavePortalId',
    async (object,{ dispatch, getState }) => {  
        dispatch(SaveportalsClear())
         dispatch(SaveportalsResponse(object.id))
         dispatch(SaveMethodType(object.methodType))
         dispatch(setPortalExpiry(object?.expDate))
                        
    }
)



const PortalsSlice = createSlice({
    name: 'portals',
    portalid:null,
    methodType:null,
    portalExpiry: null,
    currentMedia: null,
    macAddress:null,
    initialState: {
        deviceStatus: 0,
        data: null,
        loading: true,
    },
    reducers: { 
        gettingPortals: (state) => {
            state.loading = true
        },
        portalsResponse: (state, action) => {
            state.data = action.payload,
            state.deviceStatus = true
            state.loading = false
        },
        setNotRegisteredDevice: (state) => {
            state.data=[]
            state.deviceStatus= false
            state.loading= false
        },
        resetDevice: (state) => {
            state.deviceStatus= false
            state.data=[]
            state.loading= true
        },
        SaveportalsResponse:(state, action)=>{
            state.portalid = action.payload
        },
        SaveMethodType:(state, action)=>{
            state.methodType = action.payload
        },
        SaveportalsClear:(state)=>{
            state.portalid = null
        },
        setMacAddress: (state, action)=>{
            state.macAddress= action.payload
        },
        setCurrentMedia: (state, action)=> {
            state.currentMedia= action.payload
        },
        setPortalExpiry: (state, action)=>{
            state.portalExpiry= action.payload
        }
        
    },
})
export const { 
    gettingPortals, portalsResponse, setNotRegisteredDevice, resetDevice,
    SaveportalsResponse,SaveportalsClear,
    SaveMethodType,
    setMacAddress, setCurrentMedia, setPortalExpiry
} = PortalsSlice.actions;
export default PortalsSlice.reducer;