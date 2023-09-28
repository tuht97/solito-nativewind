
import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StickyHeaderSectionListProps } from './types';

export function useStickyHeaderProps<ItemT, SectionT>(
    props: StickyHeaderSectionListProps<ItemT, SectionT>
  ) {
    const {
      contentContainerStyle,
      onHeaderLayout,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      onTabsLayout,
      stickyTabs = true,
      style,
    } = props;
  
    const [headerHeight, setHeaderHeight] = useState(0);
    const [tabsHeight, setTabsHeight] = useState(0);
  
    const scrollValue = useSharedValue(0);
  
    function onHeaderLayoutInternal(e: LayoutChangeEvent) {
      setHeaderHeight(e.nativeEvent.layout.height);
      onHeaderLayout?.(e);
    }
  
    function onTabsLayoutInternal(e: LayoutChangeEvent) {
      setTabsHeight(e.nativeEvent.layout.height);
      onTabsLayout?.(e);
    }
  
    const scrollHandler = useAnimatedScrollHandler({
      onBeginDrag: (e) => {
        onScrollBeginDrag?.(e);
      },
      onEndDrag: (e) => {
        onScrollEndDrag?.(e);
      },
      onMomentumBegin: (e) => {
        onMomentumScrollBegin?.(e);
      },
      onMomentumEnd: (e) => {
        onMomentumScrollEnd?.(e);
      },
      onScroll: (e) => {
        scrollValue.value = e.contentOffset.y;
        onScroll?.(e);
      },
    });
  
  
    const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollValue.value,
              [0, headerHeight],
              [0, -headerHeight],
              stickyTabs ? Extrapolate.CLAMP : Extrapolate.EXTEND
            ),
          },
        ],
      };
    }, [scrollValue, headerHeight, stickyTabs]);
  
    return {
      headerAnimatedStyle,
      headerHeight,
      onHeaderLayoutInternal,
      onTabsLayoutInternal,
      scrollHandler,
      tabsHeight,
    };
  }