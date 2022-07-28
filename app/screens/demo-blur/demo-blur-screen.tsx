import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, Image, StyleSheet, Dimensions, ImageStyle, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { BlurView } from "expo-blur"

const WIDTH = Dimensions.get("screen").width

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const IMAGE: ImageStyle = {
  width: WIDTH - 32,
  height: WIDTH - 32,
  marginTop: 16,
  borderRadius: 8,
}
const OVERLAY: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.3)",
}
const BLUR: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "center",
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `demoBlur: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="demoBlur" component={DemoBlurScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

// const uri =
//   "https://zlskryzhbcwpdiapyh5sz4wt2bz7qqt2o6pdnvjgzqpwezvp5j5q.arweave.net/yuSo4ycIrPGgD8H7LPLT0HP4Qnp3njbVJswfYmav6ns"

const uri =
  "https://jlv3ip64dwgcylwlhtmtn4bu5qg4m7ndzlzrjl2ooctvxfqsu4.arweave.net/Suu0P9wdjCwuyzzZN-vA07A3GfaPK8xSvTnCnW5YSp0"
export const DemoBlurScreen: FC<StackScreenProps<NavigatorParamList, "demoBlur">> = observer(
  function DemoBlurScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <View style={ROOT}>
        <Image style={StyleSheet.absoluteFill} source={{ uri }} />
        <View style={[StyleSheet.absoluteFill, OVERLAY]}></View>
        <BlurView intensity={100} style={BLUR}>
          <Image style={IMAGE} source={{ uri }} />
        </BlurView>
      </View>
    )
  },
)
