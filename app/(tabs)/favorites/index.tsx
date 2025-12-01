import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/providers/ThemeProvider';
// A list of saved events
const Favorites = () => {
  const { theme } = useAppTheme();
  return (
    <View style={{  backgroundColor:'green'}}>
      {/* <View style={{ flex: 1 }}> */}
        <Text style={{ color: 'red',fontSize:44 }}>My Favorites</Text>
      {/* </View> */}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
