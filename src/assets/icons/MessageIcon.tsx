import React, { FC } from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './PasteIcon'

export const MessageIcon: FC<IconProps> = ({ fill }) => (
  <Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
    <Path
      d="M16.1097 8.03867H6.92266C6.61809 8.03867 6.32599 8.15966 6.11063 8.37502C5.89527 8.59039 5.77428 8.88248 5.77428 9.18705C5.77428 9.49162 5.89527 9.78372 6.11063 9.99908C6.32599 10.2144 6.61809 10.3354 6.92266 10.3354H16.1097C16.4143 10.3354 16.7064 10.2144 16.9217 9.99908C17.1371 9.78372 17.2581 9.49162 17.2581 9.18705C17.2581 8.88248 17.1371 8.59039 16.9217 8.37502C16.7064 8.15966 16.4143 8.03867 16.1097 8.03867ZM11.5162 12.6322H6.92266C6.61809 12.6322 6.32599 12.7532 6.11063 12.9686C5.89527 13.1839 5.77428 13.476 5.77428 13.7806C5.77428 14.0851 5.89527 14.3772 6.11063 14.5926C6.32599 14.808 6.61809 14.929 6.92266 14.929H11.5162C11.8208 14.929 12.1129 14.808 12.3282 14.5926C12.5436 14.3772 12.6646 14.0851 12.6646 13.7806C12.6646 13.476 12.5436 13.1839 12.3282 12.9686C12.1129 12.7532 11.8208 12.6322 11.5162 12.6322ZM11.5162 0C10.0081 0 8.5148 0.297038 7.12152 0.874153C5.72824 1.45127 4.46227 2.29716 3.3959 3.36353C1.24227 5.51717 0.0323687 8.43812 0.0323687 11.4838C0.0223294 14.1356 0.9405 16.7073 2.62771 18.7531L0.330948 21.0498C0.171601 21.2113 0.0636576 21.4164 0.0207379 21.6392C-0.0221819 21.8619 0.00184533 22.0924 0.0897877 22.3016C0.18517 22.5082 0.339795 22.6818 0.534035 22.8004C0.728276 22.919 0.953372 22.9772 1.18075 22.9676H11.5162C14.5619 22.9676 17.4828 21.7577 19.6365 19.6041C21.7901 17.4505 23 14.5295 23 11.4838C23 8.43812 21.7901 5.51717 19.6365 3.36353C17.4828 1.2099 14.5619 0 11.5162 0ZM11.5162 20.6709H3.94835L5.01635 19.6029C5.23023 19.3877 5.35029 19.0967 5.35029 18.7933C5.35029 18.4899 5.23023 18.1988 5.01635 17.9837C3.51264 16.4816 2.57623 14.5047 2.36667 12.3897C2.15711 10.2746 2.68736 8.15237 3.86708 6.38445C5.04679 4.61654 6.80299 3.31234 8.83645 2.69407C10.8699 2.0758 13.0549 2.1817 15.019 2.99373C16.9831 3.80576 18.605 5.27368 19.6082 7.1474C20.6114 9.02112 20.9339 11.1847 20.5208 13.2696C20.1077 15.3544 18.9845 17.2315 17.3425 18.5811C15.7006 19.9307 13.6416 20.6692 11.5162 20.6709Z"
      fill={fill}
    />
  </Svg>
)
