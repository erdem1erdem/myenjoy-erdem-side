// filepath: /c:/Users/erdtp/iptv-turkey-application-ui-972a95d5d57e/components/Screen3/LanguageModal/index.jsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { myStyle } from '../../../data';
import i18n from '../../../src/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelection = () => {
  const languages = [
    { id: 1, name: i18n.t('english'), value: 'en' },
    { id: 2, name: i18n.t('turkish'), value: 'tr' },
    { id: 3, name: i18n.t('arabic'), value: 'ar' },
    { id: 4, name: i18n.t('french'), value: 'fr' },
    { id: 5, name: i18n.t('german'), value: 'de' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('tr');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        } 
      } catch (error) {
        console.error('Failed to load language:', error);
      }
    };
    loadLanguage();
  }, []);

  const handleLanguageChange = async (value) => {
    try {
      setSelectedLanguage(value);
      i18n.changeLanguage(value);
      await AsyncStorage.setItem('selectedLanguage', value);
      console.log('Language saved:', value);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.radioButton}>
      <RadioButton
        value={item.value}
        status={selectedLanguage === item.value ? 'checked' : 'unchecked'}
        onPress={() => handleLanguageChange(item.value)}
        color="#fff"
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('language')}</Text>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    ...myStyle?.primaryFontSize,
    fontWeight: '500',
    marginBottom: 15,
  },
  text: {
    color: 'white',
    ...myStyle?.primaryFontSize,
    fontWeight: '500',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export { LanguageSelection };