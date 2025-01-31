import { useRef } from "react"
import {View, Text, TouchableHighlight, TextInput, StyleSheet, Keyboard} from "react-native"
const MyInput= ({label, placeholder, value, onChangeText})=>{
    
  const ref = useRef(null)
  const focusRef = () => {
    ref.current.focus()
  }

    return (
      <View style={styles.inputCont}>
        <Text style={styles.label}>{label}</Text>
        <TouchableHighlight
          underlayColor='#979797'
          style={styles.touchableInput}
          onPress={focusRef}
        >
          <TextInput
            ref={ref}
            placeholder= {placeholder}
            placeholderTextColor="white"
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
           
          />
        </TouchableHighlight>
      </View>
    ) 
}
const styles = StyleSheet.create({
  input: {
    fontWeight: '500',
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  inputCont: {
    paddingBottom: 15,
  },
  touchableInput: {
    marginTop: 10,
    borderWidth: 0.7,
    borderColor: 'white',
    borderRadius: 5,
    height: 38
  },
})
export {MyInput}