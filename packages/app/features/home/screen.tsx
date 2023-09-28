import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import {
  FlatList,
  NativeScrollEvent,
  SectionList,
  StyleSheet,
  ViewToken,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native'
import Animated,{ useSharedValue } from "react-native-reanimated";
import { HeaderBar } from 'app/design/components/HeaderBar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StickyHeaderSectionList } from 'app/design/components/StickyHeaderSectionList';
import HorizontalList from 'app/design/components/TabSectionList/TabBar';
export function HomeScreen() {

  const listData = [
    {
      id: 1,
      title: 'Breakfast',
      data: ['Eggs', 'Bacon', 'Milk', 'Coffee', 'Fresh fruits'],
    },
    {
      id: 2,
      title: 'Lunch',
      data: [
        'Fish',
        'Chicken with vegetables',
        'Beans',
        'Wine',
        'Pork with fried potatoes',
      ],
    },
    {
      id: 3,
      title: 'Lunch',
      data: [
        'Fish',

      ],
    },
    {
      id: 4,
      title: 'Lunch',
      data: [
        'Fish',
        'Chicken with vegetables',
        'Beans',
        'Wine',
        'Pork with fried potatoes',
      ],
    }, {
      id: 5,
      title: 'Lunch',
      data: [
        'Fish',
        'Chicken with vegetables',
        'Beans',
        'Wine',
        'Pork with fried potatoes',
      ],
    }, {
      id: 6,
      title: 'Lunch',
      data: [
        'Fish',
        'Chicken with vegetables',
        'Beans',
        'Wine',
        'Pork with fried potatoes',
      ],
    }, {
      id: 7,
      title: 'Lunch',
      data: [
        'Fish',
        'Chicken with vegetables',
        'Beans',
        'Wine',
        'Pork with fried potatoes',
      ],
    }]



  const scrollValue = useSharedValue(0);
  function onScroll(e: NativeScrollEvent) {
    'worklet';
    scrollValue.value = e.contentOffset.y;
  }
  const horizontalRef = useRef<FlatList>(null);
  const verticalRef = useRef<SectionList>(null);
  const [horizontalPressed, setHorizontalPressed] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [selected, setSelected] = useState<string | number>(1);
  const [mapping, setMapping] = useState({});
  const onSelect = useCallback(id => {
    setSelected(id);
  }, []);

  useEffect(() => {
    if (listData.length) {
      setSelected(listData[0]?.id ?? 1);
      const initialMapping: { [key: string]: any } = {};
      listData.forEach((el, index) => {
        initialMapping[el.id] = index;
      });
      setMapping(initialMapping);
      setTimeout(() => {
        setRendered(true);
      }, 700);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listData.length]);

  useEffect(() => {
    if (rendered) {
      setHorizontalPressed(false);
      setSelected(1);
      if (horizontalRef?.current && verticalRef?.current) {
        const idx = listData.findIndex(el => el.id === 0);
        if (idx === -1) {
          return;
        }
        horizontalRef.current.scrollToIndex({
          animated: true,
          index: idx,
          viewPosition: 0,
        });
        verticalRef.current.scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: idx,
          viewPosition: 0,
        });

        setTimeout(() => {
          setHorizontalPressed(false);
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered]);
  console.log(!horizontalPressed);
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    console.log(viewableItems[0] && !viewableItems[0].index, !horizontalPressed);
    if (viewableItems[0] && !viewableItems[0].index && !horizontalPressed) {
      const id = viewableItems[0].section.id;
      if (id !== selected) {
        setSelected(id);
        if (horizontalRef?.current) {
          horizontalRef.current.scrollToIndex({
            animated: true,
            index: mapping[id],
            viewPosition: 0.5,
          });
        }
      }
    }
  };

  return (
    <SafeAreaProvider>
      <View className="h-screen overflow-hidden">
        <HeaderBar scrollValue={scrollValue} />
        <StickyHeaderSectionList
          ref={verticalRef}
          sections={listData}
          onScroll={onScroll}
          renderItem={({ item }) => <View style={styles.itemContainer}>
            <Text>{item}</Text>
          </View>
          }
          renderHeader={() => <Animated.View>
            <Image
              source={{ uri: 'https://dummyimage.com/150x150.png?text=Test' }}
              style={{ height: 150, width: 150 }}
              alt="Logo"
            />
          </Animated.View>}
          renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
          onViewableItemsChanged={onViewableItemsChanged}
          renderTabs={() =>
            <Animated.View style={{marginTop:45}}>
              <HorizontalList
                data={listData}
                onSelect={onSelect}
                scrollRef={horizontalRef}
                selected={selected}
                setHorizontalPressed={setHorizontalPressed}
                verticalScrollRef={verticalRef}
              />
              </Animated.View>
              }
        />
      </View>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});