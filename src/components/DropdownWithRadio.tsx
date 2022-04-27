import React, { useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'
import ArrowDown from 'assets/icons/arrowDown.svg'
import { RadioInput } from 'components/RadioInput'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { useDropdownAnimation } from 'hooks/useDropdownAnimation'

type Props = {
  label: string
  options: string[]
  selectedOption: string
  optionsLabels?: string[]
  setSelectedOption: F1<string>
}

export const DropdownWithRadio = (props: Props) => {
  const animation = useDropdownAnimation(props.options)
  const styles = useStyles()

  useEffect(() => {
    props.setSelectedOption(props.selectedOption)
  }, [props])

  const changeSelectedOption = (option: string) => {
    props.setSelectedOption(option)
    animation.changeOpened()
  }

  const radioInputHandler = () => {}

  const hitRange = 20
  const hitSlop = { top: hitRange, bottom: hitRange, left: hitRange, right: hitRange }

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Text variant="body1Bold" textAlign="left">
          {props.label}
        </Text>
        <TouchableOpacity onPress={animation.changeOpened} hitSlop={hitSlop}>
          <Animated.View style={animation.animatedArrow}>
            <ArrowDown />
          </Animated.View>
        </TouchableOpacity>
      </Box>
      <Animated.View style={[styles.options, animation.animatedOptions]}>
        {props.options.map((option, index) => (
          <TouchableOpacity
            key={option}
            onPress={() => changeSelectedOption(option)}
            style={index === 0 ? [styles.option, styles.firstOption] : styles.option}>
            <Text variant="body1" paddingVertical="s" paddingHorizontal="m" textAlign="left">
              {props.optionsLabels ? props.optionsLabels[index] : option}
            </Text>
            <RadioInput checked={props.selectedOption === option} onPress={radioInputHandler} />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.disabledText,
    borderRadius: theme.borderRadii.lplus,
    marginVertical: theme.spacing.s,
    padding: theme.spacing.ml,
  },
  header: {
    marginRight: theme.spacing.xs,
    marginLeft: theme.spacing.xxm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  firstOption: {
    marginTop: theme.spacing.s,
  },
  options: {
    overflow: 'hidden',
  },
  icon: {
    width: theme.spacing.ml,
    height: theme.spacing.ml,
    marginHorizontal: theme.spacing.m,
  },
}))
