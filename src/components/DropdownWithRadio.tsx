import React, { useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'
import ArrowDown from 'assets/icons/arrowDown.svg'
import { RadioInput } from 'components/RadioInput'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import { useDropdownAnimation } from 'hooks/useDropdownAnimation'
import { useBooleanState } from 'hooks/useBooleanState'

type DropdownWithRadioProps = {
  label: string
  options: Option<string>[]
  selectedOption: string
  setSelectedOption: F1<string>
}

export const DropdownWithRadio = (props: DropdownWithRadioProps) => {
  const [isOpen, { toggle: setIsOpen }] = useBooleanState(false)
  const animation = useDropdownAnimation(props.options)
  const styles = useStyles()

  const { selectedOption, setSelectedOption } = props

  useEffect(() => {
    setSelectedOption(selectedOption)
  }, [selectedOption, setSelectedOption])

  const handlePress = () => {
    animation.changeOpened()
    setIsOpen()
  }

  const changeSelectedOption = (option: string) => {
    setSelectedOption(option)
    handlePress()
  }

  const findSelectedOptionLabel = (selectedOption: string, options: Option<string>[]) => {
    const selectedItem = options.find((item) => item.value === selectedOption)
    return selectedItem?.label
  }

  const optionStyles = (option: Option<string>, index: number) => {
    const chosenOptionStyles =
      props.selectedOption === option.value ? styles.chosenOption : styles.option
    const lastOptionStyles = props.options.length - 1 === index ? styles.lastOption : styles.option
    return { ...styles.option, ...chosenOptionStyles, ...lastOptionStyles }
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box style={styles.container}>
        <Box style={styles.header}>
          <Text variant="body1Bold" textAlign="left">
            {props.label}
          </Text>
          <Box style={styles.headerRight}>
            {!isOpen && (
              <Text variant="textSM" style={styles.headerChosen}>
                {findSelectedOptionLabel(props.selectedOption, props.options)}
              </Text>
            )}
            <Animated.View style={animation.animatedArrow}>
              <ArrowDown color={styles.arrow.color} />
            </Animated.View>
          </Box>
        </Box>
        <Animated.View style={[animation.animatedOptions]}>
          {props.options.map((option, index) => (
            <BaseOpacity
              key={option.label}
              onPress={() => changeSelectedOption(option.value)}
              style={optionStyles(option, index)}>
              <Text
                variant="body1"
                paddingVertical="s"
                paddingHorizontal="m"
                textAlign="left"
                color="black">
                {option.label}
              </Text>
              <RadioInput checked={props.selectedOption === option.value} onPress={() => {}} />
            </BaseOpacity>
          ))}
        </Animated.View>
      </Box>
    </TouchableOpacity>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.dropdownBackground,
    borderRadius: theme.borderRadii.lmin,
    marginVertical: theme.spacing.s,
  },
  header: {
    marginRight: 5,
    padding: theme.spacing.m,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerChosen: {
    color: theme.colors.darkGreyMuchBrighter,
    marginRight: theme.spacing.ml,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  option: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing.m,
  },
  chosenOption: {
    backgroundColor: theme.colors.dropdownPicked,
  },
  lastOption: {
    borderBottomLeftRadius: theme.borderRadii.lmin,
    borderBottomRightRadius: theme.borderRadii.lmin,
  },
  arrow: {
    color: theme.colors.black,
    marginRight: theme.spacing.l,
  },
}))
