// react
import { StyleSheet } from "react-native";
// colors
import { Colors } from "../styles/constants";

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
    paddingHorizontal: 24,
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
});
