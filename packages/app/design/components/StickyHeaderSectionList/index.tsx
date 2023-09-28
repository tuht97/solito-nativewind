import * as React from 'react';
import { SectionList, SectionListProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import type { StickyHeaderSectionListProps } from './types';
import { useStickyHeaderProps } from './hooks';

declare module "react" {
    function forwardRef<T, P = {}>(
      render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
    ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
  }
  
const NOOP = () => {};
// refer to https://github.com/software-mansion/react-native-reanimated/blob/main/src/reanimated2/component/FlatList.tsx#L13C1-L14C1
const AnimatedComponent = Animated.createAnimatedComponent(SectionList as any) as any
const StickyHeaderSectionListInner = <ItemT, SectionT>(props: React.PropsWithChildren<StickyHeaderSectionListProps<ItemT, SectionT>>, ref: React.ForwardedRef<SectionList>) => {
    const {
        containerStyle,
        contentContainerStyle,
        overScrollMode = 'never',
        renderHeader,
        renderTabs,
        scrollEventThrottle = 16,
        stickyTabs,
        style,
        onHeaderLayout,
        onTabsLayout,
        onScrollBeginDrag,
        onScrollEndDrag,
        onMomentumScrollBegin,
        onMomentumScrollEnd,
        onScroll,
        onViewableItemsChanged,
        ...rest
      } = props;
      
      const {
        headerAnimatedStyle,
        headerHeight,
        onHeaderLayoutInternal,
        onTabsLayoutInternal,
        scrollHandler,
        tabsHeight,
      } = useStickyHeaderProps(props);
    return (
        <View style={[styles.container, containerStyle]}>
        <Animated.View pointerEvents="box-none" style={[styles.header, headerAnimatedStyle]}>
          {renderHeader ? (
            <View pointerEvents="box-none" onLayout={onHeaderLayoutInternal}>
              {renderHeader()}
            </View>
          ) : null}
          {renderTabs ? (
            <View pointerEvents="box-none" onLayout={onTabsLayoutInternal}>
              {renderTabs()}
            </View>
          ) : null}
        </Animated.View>
        <AnimatedComponent
            ref={ref}
            {...rest}
            contentContainerStyle={[
              contentContainerStyle,
              { paddingTop: headerHeight },
              { paddingBottom: tabsHeight },
            ]}
            onScroll={scrollHandler}
            onScrollBeginDrag={NOOP}
            onScrollEndDrag={NOOP}
            onMomentumScrollBegin={NOOP}
            onMomentumScrollEnd={NOOP}
            overScrollMode={overScrollMode}
            progressViewOffset={headerHeight}
            scrollEventThrottle={scrollEventThrottle}
            style={[style, { paddingTop: tabsHeight }]}
            onViewableItemsChanged={onViewableItemsChanged}
        />
      </View>
    )
}

export const StickyHeaderSectionList = React.forwardRef(StickyHeaderSectionListInner);

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
  },
});
