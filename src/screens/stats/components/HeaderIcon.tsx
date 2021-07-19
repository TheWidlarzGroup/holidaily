import React from 'react'

import IconDots from 'assets/icons/icon-dots.svg'
import IconSearch from 'assets/icons/icon-search.svg'
import IconFilter from 'assets/icons/icon-filter.svg'
import { TouchableOpacity } from 'react-native'

type IconTypes = 'dots' | 'search' | 'filter'
type SectionHeaderProps = {
  icon: IconTypes
  onPress?: F0
}

const Icon = ({ icon }: { icon: IconTypes }) => {
  switch (icon) {
    case 'dots':
      return <IconDots />
    case 'search':
      return <IconSearch />
    case 'filter':
      return <IconFilter />
    default:
      return <IconDots />
  }
}

export const HeaderIcon = ({ onPress, icon }: SectionHeaderProps) => (
  <TouchableOpacity onPress={onPress}>
    <Icon icon={icon} />
  </TouchableOpacity>
)
