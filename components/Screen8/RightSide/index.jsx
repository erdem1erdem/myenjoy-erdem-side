import { View } from "react-native"
import { ChangePassword } from "../ChangePassword"
import { UserInfo } from "../UserInfo"
import { VideoPlayerSetting } from "../VideoPlayerSetting"
import { LanguageSelection } from "../LanguageSelection"

const RightSide= ({currentSetting})=>{
    return (
        <>
            {currentSetting === 0 && <VideoPlayerSetting />}
            {currentSetting === 1 && <ChangePassword />}
            {currentSetting === 2 && <UserInfo />}
            {currentSetting === 3 && <LanguageSelection />}
        </>
    )
}
export {RightSide}