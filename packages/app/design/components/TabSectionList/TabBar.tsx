import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  StyleProp,
  ViewStyle,
  FlatListProps,
} from 'react-native';
import React, { Dispatch, RefObject, SetStateAction } from 'react';


export type DataItem<T> = {
    [key: string]: any;
    data: T[];
    id: number | string;
    title: string;
  };

  export interface HorizontalListProps<T> {
    contentContainerStyle?: StyleProp<ViewStyle>;
    data: DataItem<T>[];
    onSelect: (id: number | string | null) => void;
    renderHorizontalItem?: (
      index: number,
      isSelected: boolean,
      item: DataItem<T>
    ) => React.ReactNode;
    scrollRef: RefObject<FlatList> | undefined;
    selected: number | string | null;
    setHorizontalPressed: Dispatch<SetStateAction<boolean>>;
    verticalScrollRef: RefObject<SectionList> | undefined;
    horizontalListProps?: FlatListProps<T>;
  }
const HorizontalList = <T,>({
  contentContainerStyle,
  data,
  onSelect,
  renderHorizontalItem,
  scrollRef,
  selected,
  setHorizontalPressed,
  verticalScrollRef,
  horizontalListProps,
}: HorizontalListProps<T>) => {
  const onItemPress = (id: number | string, i: number) => {
    setHorizontalPressed(true);
    onSelect(id);
    if (verticalScrollRef?.current) {
      verticalScrollRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: i,
        viewPosition: 0,
      });
    }
    if (scrollRef?.current) {
      scrollRef.current.scrollToIndex({
        animated: true,
        index: i,
        viewPosition: 0.5,
      });
    }

    setTimeout(() => {
      setHorizontalPressed(false);
    }, 300);
  };

  const renderItem = ({ item, index }: { item: DataItem<T>; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onItemPress(item.id, index)}
      >
        {renderHorizontalItem ? (
          renderHorizontalItem(index, selected === item.id, item)
        ) : (
          <View
            style={
              selected === item.id
                ? [styles.itemContainer, styles.itemContainerSelected]
                : styles.itemContainer
            }
          >
            <Text>{item.title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const getFlatlistProps = () =>
    horizontalListProps ? horizontalListProps : {};

  return (
    <View style={{width:"100%",backgroundColor:"white"}}>
        <FlatList
          bounces={false}
          contentContainerStyle={
            contentContainerStyle
              ? [styles.contentContainerStyle, contentContainerStyle]
              : styles.contentContainerStyle
          }
          data={data}
          horizontal
          initialNumToRender={30}
          keyExtractor={item => item.id.toString()}
          onScrollToIndexFailed={() => {
            // fallBack();
          }}
          ref={scrollRef}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          className='overflow-hidden'
          {...getFlatlistProps()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    backgroundColor: 'white',
    paddingLeft: 24,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemContainerSelected: {
    borderBottomColor: '#252728',
    borderBottomWidth: 2,
  },
  linearGradient: {
    bottom: -5,
    height: 5,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
});

export default HorizontalList;