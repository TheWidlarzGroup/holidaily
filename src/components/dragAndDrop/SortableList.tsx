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
import { FlatList, FlatListProps } from 'react-native'
import { useUserContext } from 'hooks/useUserContext'
import { COL, Positions, SIZE_H, NESTED_ELEM_OFFSET } from './Config'

const SCROLL_VIEW_BOTTOM_PADDING = 75

type SortableListProps = {
  children: SortableListItemType[]
}

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<SortableListItemType>>(FlatList)
export const SortableList = ({ children }: SortableListProps) => {
  const [draggedElement, setDraggedElement] = useState<null | number>(null)
  const scrollView = useAnimatedRef<FlatList<SortableListItemType>>()
  const scrollY = useSharedValue(0)
  const { t } = useTranslation('dashboard')
  const assignPositions = useCallback(() => {
    const positions: Positions = {}
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
  const [order, setOrder] = useState<typeof positions.value>(positions.value)

  useEffect(() => {
    if (draggedElement === null) setOrder(positions.value)
  }, [draggedElement, positions])

  return (
    <Box paddingBottom="xxxl">
      <OrderController order={order} />
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

// Comment: OrderController updates user context in a way that doesn't require the rerender of SortableList when UserContext changes its value
const OrderController = ({ order }: { order: Positions }) => {
  const { user, updateUser } = useUserContext()
  useEffect(() => {
    if (!user?.teams) return
    const orderedTeams = new Array(user.teams.length)
    let shouldUpdateContext = false
    user.teams.forEach((team) => {
      const newIndex = order[team.id]
      orderedTeams[newIndex] = team
      if (user.teams[newIndex]?.id !== team.id) shouldUpdateContext = true
    })
    if (shouldUpdateContext) updateUser({ teams: orderedTeams.filter((t) => !!t) })
    // Comment: Adding user.teams to dependency array starts an infinite loop.
    // Since order derives from user teams, disabling exhaustive-deps shouldn't be harmfull
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  return null
}
