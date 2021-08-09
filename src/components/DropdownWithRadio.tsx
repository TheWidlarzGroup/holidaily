import { RadioInput } from 'components/RadioInput'
import { useBooleanState } from 'hooks/useBooleanState'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { Box, mkUseStyles, Text } from 'utils/theme'
import ArrowDown from 'assets/icons/arrowDown.svg'
import { capitalizeFirstLetterOnly } from 'utils/role'

type DropdownWithRadioProps = {
  label: string
  options: string[]
  selectedOption: string
  setSelectedOption: F1<string>
}

export const DropdownWithRadio = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
}: DropdownWithRadioProps) => {
  const [opened, { toggle: changeOpened }] = useBooleanState(false)
  const height = 40 * options.length
  const styles = useStyles()

  useEffect(() => {
    setSelectedOption(selectedOption)
  }, [selectedOption, setSelectedOption])

  const changeSelectedOption = (option: string) => {
    setSelectedOption(option)
  }

  const heightProgress = useDerivedValue(
    () => (opened ? withTiming(height, { duration: 200 }) : withTiming(0, { duration: 200 })),
    [opened]
  )
  const animatedOptions = useAnimatedStyle(() => ({
    height: heightProgress.value,
    opacity: heightProgress.value / height,
  }))
  const animatedArrow = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${(heightProgress.value / height) * 180}deg`,
      },
    ],
  }))

  return (
    <>
      <Box style={styles.container}>
        <Box style={styles.header}>
          <Text variant="body1Bold" textAlign="left">
            {label}
          </Text>
          <TouchableOpacity
            onPress={changeOpened}
            hitSlop={{ top: 20, bottom: 20, left: 300, right: 20 }}>
            <Animated.View style={animatedArrow}>
              <ArrowDown />
            </Animated.View>
          </TouchableOpacity>
        </Box>
        <Animated.View style={[styles.options, animatedOptions]}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => changeSelectedOption(option)}>
              <Text variant="body1" marginVertical="s" textAlign="left">
                {capitalizeFirstLetterOnly(option)}
              </Text>
              <RadioInput checked={selectedOption === option} onPress={() => {}} />
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Box>
    </>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.disabledText,
    borderRadius: theme.borderRadii.lplus,
    padding: theme.spacing.ml,
    marginVertical: theme.spacing.s,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 3,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  options: {
    overflow: 'hidden',
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: theme.spacing.m,
  },
}))
