// type
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface IIconButtonProps {
  size?: number;
  icon:
    | "edit"
    | "resume"
    | "remove"
    | "pause"
    | "cansel"
    | "addTag"
    | "prev"
    | "next"
    | "calendar"
    | "filter"
    | "clearFilter";
  onPress: (id?) => void;
  color?: string;
  style?: typeStyleObj;
  testID?: string;
}

export interface IMaterialIconProps {
  name: string;
  color?: string;
  style?: typeStyleObj;
  width: number;
  height: number;
}
