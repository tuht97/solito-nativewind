import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, FlatListProps, SectionList, SectionListData, SectionListProps, StyleProp, View, ViewStyle, Image } from 'react-native';
import HorizontalList, { DataItem } from './TabBar';
import VerticalList from './SectionList';
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { DynamicHeader } from './DynamicHeader';

export interface IProps<T> {
    horizontalListProps?: FlatListProps<T>;
    verticalListProps?: SectionListProps<T>;
    data: DataItem<T>[];
    horizontalListContainerStyle?: StyleProp<ViewStyle>;
    initialId?: number | string;
    renderHorizontalItem?: (
      index: number,
      isSelected: boolean,
      item: DataItem<T>
    ) => React.ReactNode;
    renderSectionHeader?: (
      section: SectionListData<T>
    ) => React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    > | null;
    renderVerticalItem?: (item: T) => JSX.Element;
    verticalListContainerStyle?: StyleProp<ViewStyle>;
    headerScrollHeight?: Animated.AnimatedInterpolation<string | number>
    scrollOffset: Animated.Value
  }
  
const SyncedList = <T,>({
  data,
  horizontalListContainerStyle,
  initialId,
  renderHorizontalItem,
  renderSectionHeader,
  renderVerticalItem,
  verticalListContainerStyle,
  horizontalListProps,
  verticalListProps,
  scrollOffset,
  headerScrollHeight
}: IProps<T>) => {
  const horizontalRef = useRef<FlatList>(null);
  const verticalRef = useRef<SectionList>(null);
  const [horizontalPressed, setHorizontalPressed] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [selected, setSelected] = useState<string | number>('');
  const [mapping, setMapping] = useState({});

  const onSelect = useCallback(id => {
    setSelected(id);
  }, []);

  useEffect(() => {
    if (data.length) {
      setSelected(data[0]?.id ?? '');
      const initialMapping: { [key: string]: any } = {};
      data.forEach((el, index) => {
        initialMapping[el.id] = index;
      });
      setMapping(initialMapping);
      setTimeout(() => {
        setRendered(true);
      }, 700);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  useEffect(() => {
    if (rendered && initialId) {
      setHorizontalPressed(true);
      setSelected(initialId);
      if (horizontalRef?.current && verticalRef?.current) {
        const idx = data.findIndex(el => el.id === initialId);
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
 
  return (
    <Animated.View style={{backgroundColor:"white", marginTop:headerScrollHeight}}>
      <HorizontalList<T>
        contentContainerStyle={horizontalListContainerStyle}
        data={data}
        onSelect={onSelect}
        renderHorizontalItem={renderHorizontalItem}
        scrollRef={horizontalRef}
        selected={selected}
        setHorizontalPressed={setHorizontalPressed}
        verticalScrollRef={verticalRef}
        horizontalListProps={horizontalListProps}
      />
      
      <VerticalList<T>
        contentContainerStyle={verticalListContainerStyle}
        data={data}
        horizontalPressed={horizontalPressed}
        horizontalScrollRef={horizontalRef}
        mapping={mapping}
        renderSectionHeader={renderSectionHeader}
        renderVerticalItem={renderVerticalItem}
        scrollRef={verticalRef}
        selected={selected}
        setSelected={setSelected}
        verticalListProps={verticalListProps}
      />
     
    </Animated.View>
  );
};

export default SyncedList;