import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Item } from 'screens/dashboard/dragAndDrop/Item'
import { Carousel } from 'screens/dashboard/components/Carousel'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { User } from 'mock-api/models/mirageTypes'
import { COL, Positions, SIZE_H, NESTED_ELEM_OFFSET } from './Config'

const SCROLL_VIEW_BOTTOM_PADDING = 75

type SortableListProps = {
  children: ReactElement<{ id: number }>[]
  openUserModal: F1<User>
}

export const SortableList = ({ children, openUserModal }: SortableListProps) => {
  const [draggedElement, setDraggedElement] = useState<null | number>(null)
  const scrollView = useAnimatedRef<Animated.ScrollView>()
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
  return (
    <Box paddingBottom="xxxl">
      <Animated.ScrollView
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
        onScroll={onScroll}>
        <Box height={NESTED_ELEM_OFFSET}>
          <Carousel openUserModal={openUserModal} />
          <Text variant="lightGreyRegular" color="headerGrey" marginHorizontal="m">
            {t('teamsList').toUpperCase()}
          </Text>
        </Box>
        {children.map((child) => (
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
        ))}
      </Animated.ScrollView>
    </Box>
  )
}
