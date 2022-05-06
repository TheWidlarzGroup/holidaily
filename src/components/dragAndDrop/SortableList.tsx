import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Item, SortableListItemType } from 'components/dragAndDrop/Item'
import { Carousel } from 'screens/dashboard/components/Carousel'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { User } from 'mock-api/models/mirageTypes'
import { FlatList, FlatListProps } from 'react-native'
import { COL, Positions, SIZE_H, NESTED_ELEM_OFFSET } from './Config'

const SCROLL_VIEW_BOTTOM_PADDING = 75

type SortableListProps = {
  children: SortableListItemType[]
  openUserModal: F1<User>
}

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<SortableListItemType>>(FlatList)
export const SortableList = ({ children, openUserModal }: SortableListProps) => {
  const [draggedElement, setDraggedElement] = useState<null | number>(null)
  const scrollView = useAnimatedRef<FlatList<SortableListItemType>>()
  const scrollY = useSharedValue(0)
  const { t } = useTranslation('dashboard')
  const assignPositions = useCallback(() => {
    const positions: { [key: string]: number } = {}
    children.forEach((child, idx) => (positions[child.props.id] = idx))
    return positions
  }, [children])
  const positions = useSharedValue<Positions>(assignPositions())
  useFocusEffect(useCallback(() => () => setDraggedElement(null), []))
  useEffect(() => {
    positions.value = assignPositions()
  }, [positions, assignPositions])
  const onLongPress = (element: null | number) => {
    setDraggedElement(element)
  }
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  // We need to use CellRenderer because the zIndex doesn't work inside a flatlist renderItem https://github.com/facebook/react-native/issues/18616
  const CellRenderer = useCallback(
    (props: SortableListProps) => {
      const { children } = props
      return <Box zIndex={children[0].props?.id === draggedElement ? '10' : '0'}>{children}</Box>
    },
    [draggedElement]
  )

  return (
    <Box paddingBottom="xxxl">
      <AnimatedFlatList
        removeClippedSubviews={false}
        ref={scrollView}
        contentContainerStyle={{
          height:
            Math.ceil(children.length / COL) * SIZE_H +
            NESTED_ELEM_OFFSET +
            SCROLL_VIEW_BOTTOM_PADDING,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        CellRendererComponent={CellRenderer}
        ListHeaderComponent={
          <Box height={NESTED_ELEM_OFFSET}>
            <Carousel openUserModal={openUserModal} />
            <Text
              variant="lightGreyRegular"
              color="darkGrey"
              marginHorizontal="xm"
              marginBottom="xs"
              letterSpacing={0.7}>
              {t('teamsList')}
            </Text>
          </Box>
        }
        data={children}
        renderItem={useCallback(
          ({ item: child }) => (
            <Item
              scrollView={scrollView}
              onLongPress={() => onLongPress(child?.props?.id)}
              stopDragging={() => setDraggedElement(null)}
              draggedElement={draggedElement}
              scrollY={scrollY}
              key={child?.props?.id}
              positions={positions}
              id={child?.props?.id}>
              {child}
            </Item>
          ),
          [draggedElement, positions, scrollView, scrollY]
        )}
      />
    </Box>
  )
}
