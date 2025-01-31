import { useState } from "react"
import { MyButton } from "../../../Helpers"

const Season= ({seasonNumber, index, currentSeason, setCurrentSeason})=>{
    const [isFocus, setIsFocus]= useState(false)
    const toggleFocus= ()=>{
        setIsFocus(!isFocus)
    }
    return (
        <MyButton
            hasTVPreferredFocus={index===currentSeason}
            title={'Season '+seasonNumber}
            onPress={()=>{setCurrentSeason(index); toggleFocus()}}
            style={{width: 90}}
        />
    )
}
export {Season}