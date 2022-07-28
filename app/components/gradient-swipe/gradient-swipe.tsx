import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import AnimatedLinearGradient, { presetColors } from "react-native-animated-linear-gradient"
import Slider from "react-native-slide-to-unlock"
import MaskedView from "@react-native-masked-view/masked-view"

const GRADIENT_CONTAINER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: 30,
  width: 100,
}
const TEXT_CONTAINER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: 30,
  width: 100,
}

const TEXT: TextStyle = {
  fontWeight: "500",
  fontSize: 15,
}

const SLIDER: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 3,
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}

const SLIDE_ELEMENT: ViewStyle = {
  width: 40,
  margin: 4,
  borderRadius: 4,
  height: 40,
  backgroundColor: "black",
}
export interface GradientSwipeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const GradientSwipe = observer(function GradientSwipe(props: GradientSwipeProps) {
  return (
    <Slider
      onEndReached={() => {
        console.log("swapped")
      }}
      containerStyle={SLIDER}
      sliderElement={<View style={SLIDE_ELEMENT} />}
    >
      <MaskedView
        style={GRADIENT_CONTAINER}
        maskElement={
          <View style={TEXT_CONTAINER}>
            <Text style={TEXT}>Slide to swap</Text>
          </View>
        }
      >
        <AnimatedLinearGradient customColors={presetColors.instagram} speed={500} />
      </MaskedView>
    </Slider>
  )
})
