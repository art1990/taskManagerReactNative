export interface ITaskInfoProps {
  title: string;
  project: string;
  isPaused: boolean;
  duration?: number;
  startTaskTime?: number;
  isCompleted?: boolean;
  onResumePress?: () => void;
  toView?: () => void;
  style?: {};
}
