import React, { ReactElement, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Item } from 'screens/dashboard/dragAndDrop/Item'
import { Carousel } from 'screens/dashboard/components/Carousel'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { COL, Positions, SIZE_H, NESTED_ELEM_OFFSET } from './Config'

type SortableListProps = {
  children: ReactElement<{ groupId: number }>[]
}

export const SortableList = ({ children }: SortableListProps) => {
  const [draggedElement, setDraggedElement] = useState<null | number>(null)
  const scrollView = useAnimatedRef<Animated.ScrollView>()
  const scrollY = useSharedValue(0)
  const scrollStyle = useAnimatedStyle(() => ({ transform: [{ translateY: scrollY.value }] }))
  const positions = useSharedValue<Positions>(
    // if positions object from database => { [child.props.groupId]: child.props.order }
    Object.assign({}, ...children.map((child, index) => ({ [child.props.groupId]: index })))
  )
  useFocusEffect(React.useCallback(() => () => setDraggedElement(null), []))

  const { t } = useTranslation('dashboard')

  const onLongPress = (element: null | number) => {
    setDraggedElement(element)
  }
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  return (
    <Box paddingBottom={'xxxl'}>
      <Animated.View style={scrollStyle} />
      <Animated.ScrollView
        ref={scrollView}
        contentContainerStyle={{
          height: Math.ceil(children.length / COL) * SIZE_H + NESTED_ELEM_OFFSET,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}>
        <Box height={NESTED_ELEM_OFFSET}>
          <Carousel />
          <Text variant="lightGreyRegular" color="headerGrey" marginHorizontal="m">
            {t('teamsList').toUpperCase()}
          </Text>
        </Box>

        {children.map((child) => (
          <Item
            scrollView={scrollView}
            onLongPress={() => onLongPress(child.props.groupId)}
            stopDragging={() => setDraggedElement(null)}
            draggedElement={draggedElement}
            scrollY={scrollY}
            key={child.props.groupId}
            positions={positions}
            id={child.props.groupId}>
            {child}
          </Item>
        ))}
      </Animated.ScrollView>
    </Box>
  )
}
