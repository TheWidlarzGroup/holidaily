import React, { JSXElementConstructor, ReactElement, useCallback, useEffect, useState } from 'react'
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
import { Analytics } from 'services/analytics'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { COL, Positions, SIZE_H, NESTED_ELEM_OFFSET } from './Config'

const SCROLL_VIEW_BOTTOM_PADDING = 75

type SortableListProps = {
  children: SortableListItemType[]
}

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<SortableListItemType>>(FlatList)

let persistedOrder: Positions = {}

const calculateContainerHeight = (dataLength?: number) =>
  !dataLength
    ? 600
    : Math.ceil(dataLength / COL) * SIZE_H + NESTED_ELEM_OFFSET + SCROLL_VIEW_BOTTOM_PADDING

const getItemLayout = (data: SortableListItemType[] | null | undefined, index: number) => ({
  height: NESTED_ELEM_OFFSET,
  offset: calculateContainerHeight(data?.length),
  length: data?.length || 0,
  index,
})

export const SortableList = ({ children }: SortableListProps) => {
  const [draggedElement, setDraggedElement] = useState<null | number>(null)
  const [prevElement, setPrevElement] = useState<null | number>(null)
  const scrollView = useAnimatedRef<FlatList<SortableListItemType>>()
  const scrollY = useSharedValue(0)
  const { t } = useTranslation('dashboard')
  const positions = useSharedValue<Positions>(orderToPositions(makeOrder(children, persistedOrder)))
  const isDrawerOpen = useIsDrawerOpen()

  useEffect(() => {
    if (isDrawerOpen) setDraggedElement(null)
  }, [isDrawerOpen])

  const onLongPress = (element: null | number) => {
    setDraggedElement(element)
    if (element !== null) {
      setPrevElement(element)
      Analytics().track('DASHBOARD_TEAM_LONG_PRESSED', { element })
    }
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

  // Comment: runs when we add/remove teams in edit profile
  useEffect(() => {
    positions.value = orderToPositions(makeOrder(children, persistedOrder))
  }, [children, positions])

  useEffect(() => {
    if (draggedElement === null) {
      persistedOrder = positions.value
      const newPosition = persistedOrder[`${prevElement}`]
      Analytics().track('DASHBOARD_TEAM_DRAGGED', { element: prevElement, newPosition })
    }
  }, [draggedElement, positions, prevElement])

  const containerHeight = {
    height: calculateContainerHeight(children.length),
  }

  return (
    <Box paddingBottom="xxxl">
      <AnimatedFlatList
        getItemLayout={getItemLayout}
        removeClippedSubviews={false}
        ref={scrollView}
        contentContainerStyle={containerHeight}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        CellRendererComponent={CellRenderer}
        ListHeaderComponent={
          <>
            {children.length > 0 ? (
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
            ) : (
              <>
                <Text
                  marginTop="m"
                  variant="lightGreyRegular"
                  color="darkGrey"
                  marginHorizontal="xm"
                  marginBottom="xs"
                  letterSpacing={0.7}>
                  {t('teamsList').toUpperCase()}
                </Text>
                <JoinFirstTeam />
              </>
            )}
          </>
        }
        data={children}
        renderItem={renderItem}
      />
    </Box>
  )
}

export const orderToPositions = (order: (string | number)[]) => {
  const positions: Positions = {}
  order.forEach((item, idx) => (positions[item] = idx))
  return positions
}

export const makeOrder = (
  sortableItems: ReactElement<{ id: number }, string | JSXElementConstructor<any>>[],
  persistedOrder: Positions
) => {
  const persistedOrderKeys = keys(persistedOrder)
  let order: (number | string)[] = new Array(persistedOrderKeys.length)
  persistedOrderKeys.forEach((key) => {
    const idx = persistedOrder[key]
    order[idx] = key
  })
  order = order.filter((item) => sortableItems.some((child) => child.props.id === item))
  const newTeams = sortableItems.filter((child) => !order.some((item) => child.props.id === item))
  newTeams.forEach((child) => order.push(child.props.id))
  return order
}
