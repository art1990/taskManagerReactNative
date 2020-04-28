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
    | "filter";
  onPress: (id?) => void;
  color?: string;
  style?: {};
}

export interface IMaterialIconProps {
  name: string;
  color?: string;
  width: number;
  height: number;
}
