/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"

const ICON_CONTAINER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  width: 58,
  height: 58,
}

export interface TabBarIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isFocused: boolean
  onPress: any
  onLongPress: any
  options: any
  label: string
}

/**
 * Describe your component here
 */
export const TabBarIcon = observer(function TabBarIcon(props: TabBarIconProps) {
  const { isFocused, onPress, onLongPress, options, label } = props

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={ICON_CONTAINER}
    >
      <Text style={{ color: isFocused ? "#fff" : "#ddd" }}>{label}</Text>
    </TouchableOpacity>
  )
})
