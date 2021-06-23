import React, { ReactElement } from 'react'
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
  editing: boolean
  onDragEnd: F0
}

export const SortableList = ({ children, editing, onDragEnd }: SortableListProps) => {
  const scrollView = useAnimatedRef<Animated.ScrollView>()
  const scrollY = useSharedValue(0)
  const positions = useSharedValue<Positions>(
    // positions object from database
    Object.assign({}, ...children.map((child, index) => ({ [child.props.groupId]: index })))
  )

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })
  const stylez = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: scrollY.value,
      },
    ],
  }))
  const { t } = useTranslation('dashboard')

  return (
    <Box paddingBottom="xxxl">
      <Animated.View style={stylez} />
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
            scrollY={scrollY}
            key={child.props.groupId}
            positions={positions}
            editing={editing}
            id={child.props.groupId}
            onDragEnd={onDragEnd}>
            {child}
          </Item>
        ))}
      </Animated.ScrollView>
    </Box>
  )
}
