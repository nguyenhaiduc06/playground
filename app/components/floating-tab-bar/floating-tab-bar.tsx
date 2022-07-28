/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import MaskedView from "@react-native-masked-view/masked-view"
import { BlurView } from "expo-blur"
import { TabBarIcon } from "../tab-bar-icon/tab-bar-icon"

const TAB_BAR_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  position: "absolute",
  bottom: 24,
  width: "100%",
}

const BLUR_VIEW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  borderRadius: 999,
  width: 264,
}

export interface FloatingTabBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  state: any
  descriptors: any
  navigation: any
}

/**
 * Describe your component here
 */
export const FloatingTabBar = observer(function FloatingTabBar(props: FloatingTabBarProps) {
  const { state, navigation, descriptors } = props

  return (
    <View style={TAB_BAR_CONTAINER}>
      <MaskedView
        style={BLUR_VIEW}
        maskElement={
          <View
            style={{ borderRadius: 999, height: 58, width: 264, backgroundColor: "black" }}
          ></View>
        }
      >
        <BlurView intensity={100} style={BLUR_VIEW}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}></View>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name

            const isFocused = state.index === index

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              })
            }

            return (
              <TabBarIcon
                key={index}
                options={options}
                onPress={onPress}
                onLongPress={onLongPress}
                label={label}
                isFocused={isFocused}
              />
            )
          })}
        </BlurView>
      </MaskedView>
    </View>
  )
})
