export interface ITitleProps {
  text: string;
  buttonText?: string;
  style?: {};
  buttonAction?: () => void;
  iconButtonList?: JSX.Element[];
  isCompleted?: boolean;
  children?: any;
}
