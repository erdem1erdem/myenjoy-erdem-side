import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const PinComponent = forwardRef(({ pin, setPin, onSubmitEditing }, ref) => {
  const inputRefs = useRef([])

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }
  }))

  const handlePinChange = (text, index) => {
    const newPin = [...pin]
    newPin[index] = text
    setPin(newPin)

    if (text && index < pin.length - 1) {
      inputRefs.current[index + 1].focus()
    } else if (text && index === pin.length - 1) {
      inputRefs.current[index].blur()
      if (onSubmitEditing) {
        onSubmitEditing()
      }
    }
  }

  return (
    <View style={styles.pinContainer}>
      {pin.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={styles.pinInput}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handlePinChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              if (index > 0) {
                inputRefs.current[index - 1].focus()
              }
            }
          }}
        />
      ))}
    </View>
  )
})

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 18,
    width: 45,
    height: 45,
    textAlign: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
})

export { PinComponent }
