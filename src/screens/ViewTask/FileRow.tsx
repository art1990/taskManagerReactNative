// react
import React, { useState, useMemo, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
// rn-paper
import { ProgressBar } from "react-native-paper";
// components
import TaskField from "../components/TaskField";
// hook
import useDownload from "../../hooks/useDownload";
// colors
import { Colors } from "../../assets/styles/constants";
// type
import { TFile } from "../../redux/task";

interface IFileRow {
  file: TFile;
}

const FileRow: React.FC<IFileRow> = ({ file }) => {
  const { downloadFile, progress } = useDownload();
  const [height, setHeight] = useState(0);

  const onLayout = useCallback(
    (e) => {
      setHeight(e.nativeEvent.layout.height);
    },
    [setHeight]
  );

  const progressContainerHeight = useMemo(() => ({ minHeight: height }), [
    progress,
  ]);

  return (
    <View onLayout={onLayout}>
      {progress > 0 && progress < 1 ? (
        <View style={[styles.progress, progressContainerHeight]}>
          <ProgressBar progress={progress} color={Colors.progress} />
        </View>
      ) : (
        file && (
          <TouchableOpacity onPress={() => downloadFile(file)}>
            <TaskField title="Added file" text={file.name} />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  progress: { justifyContent: "center" },
});

export default FileRow;
