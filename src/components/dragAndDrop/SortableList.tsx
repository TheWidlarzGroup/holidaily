import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { keys } from 'utils/manipulation'
import { FlatList, FlatListProps } from 'react-native'
import { JoinFirstTeam } from 'screens/dashboard/components/JoinFirstTeam'
import { COL, Positions, SIZE_H, NESTED_ELEM_OFFSET } from './Config'

const SCROLL_VIEW_BOTTOM_PADDING = 75

type SortableListProps = {
  children: SortableListItemType[]
}

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<SortableListItemType>>(FlatList)

let persistedOrder: Positions = {}
const orderToPositions = (order: (string | number)[]) => {
  const positions: Positions = {}
  order.forEach((item, idx) => (positions[item] = idx))
  return positions
}

export const SortableList = ({ children }: SortableListProps) => {
  const order = useMemo(() => {
    const persistedOrderKeys = keys(persistedOrder)
    let order: (number | string)[] = new Array(persistedOrderKeys.length)
    persistedOrderKeys.forEach((key) => {
      const idx = persistedOrder[key]
      order[idx] = key
    })
    order = order.filter((item) => children.some((child) => child.props.id === item))
    const newTeams = children.filter((child) => !order.some((item) => child.props.id === item))
    newTeams.forEach((child) => order.push(child.props.id))
    return order
  }, [children])

  const [draggedElement, setDraggedElement] = useState<null | number>(null)
  const scrollView = useAnimatedRef<FlatList<SortableListItemType>>()
  const scrollY = useSharedValue(0)
  const { t } = useTranslation('dashboard')
  const assignPositions = useCallback(() => {
    const positions: Positions = {}
    children.forEach((child, idx) => (positions[child.props.id] = idx))
    return positions
  }, [children])
  const positions = useSharedValue<Positions>(
    order.length ? orderToPositions(order) : assignPositions()
  )

  useFocusEffect(useCallback(() => () => setDraggedElement(null), []))
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
  const renderItem = useCallback(
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
  )

  useEffect(() => {
    positions.value = orderToPositions(order)
  }, [order, positions])

  useEffect(() => {
    if (draggedElement === null) {
      persistedOrder = positions.value
    }
  }, [draggedElement, positions])

  const CONTAINER_HEIGHT =
    Math.ceil(children.length / COL) * SIZE_H + NESTED_ELEM_OFFSET + SCROLL_VIEW_BOTTOM_PADDING

  return (
    <Box paddingBottom="xxxl">
      <AnimatedFlatList
        removeClippedSubviews={false}
        ref={scrollView}
        contentContainerStyle={{
          height: children.length > 0 ? CONTAINER_HEIGHT : 600,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        CellRendererComponent={CellRenderer}
        ListHeaderComponent={
          <>
            <Box height={NESTED_ELEM_OFFSET}>
              <Carousel />
              <Text
                variant="lightGreyRegular"
                color="darkGrey"
                marginHorizontal="xm"
                marginBottom="xs"
                letterSpacing={0.7}>
                {t('teamsList').toUpperCase()}
              </Text>
            </Box>
            {!(children.length > 0) && <JoinFirstTeam />}
          </>
        }
        data={children}
        renderItem={renderItem}
      />
    </Box>
  )
}
