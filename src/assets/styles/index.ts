// react
import { StyleSheet } from "react-native";
// colors
import { Colors } from "../styles/constants";
// utils
import { vw } from "react-native-expo-viewport-units";

export const paddingHorizontal = 24;

export default StyleSheet.create({
  authWrapper: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },

  wrapper: {
    position: "relative",
    overflow: "visible",
    paddingBottom: 25,
    flex: 1,
    flexDirection: "column",
    paddingHorizontal,
    backgroundColor: Colors.white,
  },

  authContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  columnSpaceBetween: {
    justifyContent: "space-between",
  },

  rowSpaceBetween: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flex: 0,
    flexDirection: "row",
  },

  fullScreen: {
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: vw(-50),
    marginRight: vw(-50),
    width: vw(100),
    // paddingHorizontal,
  },
});
