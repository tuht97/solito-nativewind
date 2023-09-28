import React, { FunctionComponent } from "react";
import {  Button, TextInput } from "react-native";
import Animated,{SharedValue, interpolate,useAnimatedStyle,Extrapolate} from 'react-native-reanimated'
import { useSafeAreaInsets} from "react-native-safe-area-context";

export const DUMMY_HEADER_HEIGHT = 50;

type Props = {
  scrollValue: SharedValue<number>;
};
export const HeaderBar: FunctionComponent<Props> = ({ scrollValue }) => {
  const { top: topInset } = useSafeAreaInsets();
  
  const headerContainerAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 110, 150], [0, 0, 1], Extrapolate.CLAMP) };
  },[scrollValue]);
  return <Animated.View pointerEvents="box-none" style={[headerContainerAnimatedStyle,{backgroundColor:"#4995ec",height:topInset + DUMMY_HEADER_HEIGHT,width:"100%",position:"absolute",top:0, display:"flex", justifyContent:"center", alignItems:'center', flexDirection:"row", zIndex:1000000}]}>
    {/* <Button title="<="/> */}
    <TextInput className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" style={{width:"70%"}}/>
  </Animated.View>;
};

