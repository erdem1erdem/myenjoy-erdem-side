import { useRef } from "react";
import { useTVEventHandler } from 'react-native';
const TVEventHook = (onPress, onLongPress) => {
    const pressStartTimeRef = useRef(null);

    const handleTVEvent = evt => {
        if (evt && evt.eventType === 'select') {
            const currentTime = new Date().getTime();
            if (pressStartTimeRef.current) {
                const pressDuration = currentTime - pressStartTimeRef.current;
                if (pressDuration >= 500) { 
                    if (onLongPress) onLongPress();
                } else {
                    if (onPress) onPress();
                }
                pressStartTimeRef.current = null;
            }
        }
    };

    useTVEventHandler(handleTVEvent);
};

export default TVEventHook;