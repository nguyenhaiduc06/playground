/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DemoScreen, DemoListScreen, DemoBlurScreen, WelcomeScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FloatingTabBar } from "../components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  rootTab: undefined
  demoBlur: undefined
  // 🔥 Your screens go here
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createBottomTabNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="rootTab"
    >
      <Stack.Screen name="rootTab" component={RootTab} />
      <Stack.Screen name="demoBlur" component={DemoBlurScreen} options={{
        headerShown: false,
        presentation: "modal"
      }} />
    </Stack.Navigator>
  )
}

const RootTab = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }} tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tab.Screen name="a" component={WelcomeScreen} />
      <Tab.Screen name="b" component={DemoScreen} />
      <Tab.Screen name="c" component={DemoListScreen} />
      <Tab.Screen name="d" component={DemoBlurScreen} />
    </Tab.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
