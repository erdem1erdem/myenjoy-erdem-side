import React, { useState, useRef, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const ListItem = React.memo(({ item, onPress, isSelected }) => {
  const backgroundColor = isSelected ? 'red' : 'white';

  return (
    <TouchableOpacity onPress={() => onPress(item.id)} style={[styles.item, { backgroundColor }]}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
});

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  // Refs to store first, last visible indexes and current focused index


  const handlePress = useCallback((id) => {
    setSelectedId(id);
    const index = data.findIndex(item => item.id === id);
    focusedIndexRef.current = index;
  }, [data]);

  const renderItem = useCallback(({ item }) => {
    const isSelected = item.id === selectedId;
    return (
      <ListItem
        item={item}
        onPress={handlePress}
        isSelected={isSelected}
      />
    );
  }, [selectedId]);

  

  const data = Array.from({ length: 80 }, (_, i) => ({ id: i.toString(), name: `Item ${i + 1}` }));

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={{ padding: 20 }}>
        <Text>First Visible Index: {firstIndexRef.current}</Text>
        <Text>Last Visible Index: {lastIndexRef.current}</Text>
        <Text>Current Focused Index: {focusedIndexRef.current}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
