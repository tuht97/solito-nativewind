import * as React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

const Header_Max_Height = 150;
const Header_Min_Height = 0;

interface DynamicHeader {
    animHeaderValue: Animated.Value
    uri: string
    height: number | Animated.Value
   
}
export const DynamicHeader:React.FC<React.PropsWithChildren<DynamicHeader>>=({animHeaderValue, uri, height}) => {
  const imgScale = animHeaderValue.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: "clamp"
  });

  const animateHeaderHeight =  animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height , Header_Min_Height],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View 
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
            transform: [{translateY: Animated.multiply(animHeaderValue, 0.65)}, {scale: imgScale}],
          },
        ]}
      >
       <Animated.Image source={{uri}} style={{height,width:"100%"}}/>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: { 
    left: 0,
    right: 0,
    display:"flex",
    flexDirection:"column",
    justifyContent: 'flex-end',     
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
   
  },
});
