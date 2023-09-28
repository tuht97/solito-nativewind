import type { ReactElement } from 'react';
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  SectionListData,
  SectionListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { AnimateProps } from 'react-native-reanimated';

export interface StickyHeaderSharedProps {
    containerStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    onHeaderLayout?: (e: LayoutChangeEvent) => void;
    onMomentumScrollBegin?: (e: NativeScrollEvent) => void;
    onMomentumScrollEnd?: (e: NativeScrollEvent) => void;
    onScroll?: (e: NativeScrollEvent) => void;
    onScrollBeginDrag?: (e: NativeScrollEvent) => void;
    onScrollEndDrag?: (e: NativeScrollEvent) => void;
    onTabsLayout?: (e: LayoutChangeEvent) => void;
    renderHeader?: () => ReactElement | null;
    renderTabs?: () => ReactElement | null;
    stickyTabs?: boolean;
    style?: StyleProp<ViewStyle>;
  }


export interface StickyHeaderSectionListProps<ItemT, SectionT>
  extends StickyHeaderSharedProps,
    Omit<
      AnimateProps<SectionListProps<ItemT, SectionT>>,
      | 'contentContainerStyle'
      | 'onMomentumScrollBegin'
      | 'onMomentumScrollEnd'
      | 'onScroll'
      | 'onScrollBeginDrag'
      | 'onScrollEndDrag'
      | 'sections'
      | 'style'
    > {
  sections: ReadonlyArray<SectionListData<ItemT, SectionT>>;
}