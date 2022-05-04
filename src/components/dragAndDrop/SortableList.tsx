import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Item } from 'components/dragAndDrop/Item'
import { Carousel } from 'screens/dashboard/components/Carousel'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { User } from 'mock-api/models/mirageTypes'
import { FlatList } from 'react-native'
import { COL, Positions, SIZE_H, NESTED_ELEM_OFFSET } from './Config'

const SCROLL_VIEW_BOTTOM_PADDING = 75

type SortableListProps = {
  children: ReactElement<{ id: number }>[]
  openUserModal: F1<User>
}
const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList)
export const SortableList = ({ children, openUserModal }: SortableListProps) => {
  const [draggedElement, setDraggedElement] = useState<null | number>(null)
  const scrollView = useAnimatedRef<FlatList<any>>()
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
  const draggableChildren = useMemo(
    () =>
      children.map((child) => (
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
      )),
    [children, draggedElement, positions, scrollView, scrollY]
  )
  return (
    <Box paddingBottom="xxxl">
      <AnimatedFlatList
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
        ListHeaderComponent={
          <Box height={NESTED_ELEM_OFFSET}>
            <Carousel openUserModal={openUserModal} />
            <Text variant="lightGreyRegular" color="headerGrey" marginHorizontal="m">
              {t('teamsList').toUpperCase()}
            </Text>
          </Box>
        }
        data={children}
        renderItem={({ item: child }: any) => (
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
        )}>
        {draggableChildren}
      </AnimatedFlatList>
    </Box>
  )
}
