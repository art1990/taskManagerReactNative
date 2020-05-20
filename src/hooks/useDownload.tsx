// react
import React, { useState, useCallback } from "react";
// file system
import * as FileSystem from "expo-file-system";
// type
import { TFile } from "../redux/task/index";

type TDownloadProgress = {
  totalBytesWritten: number;
  totalBytesExpectedToWrite: number;
};

type TCallback = ({
  totalBytesWritten,
  totalBytesExpectedToWrite,
}: TDownloadProgress) => void;

export default () => {
  const [progress, setProgress] = useState(0);

  const callback: TCallback = useCallback(
    (downloadProgress: TDownloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      setProgress(progress);
    },
    [setProgress]
  );

  const downloadFile = async (file: TFile) => {
    const downloadResumable = await FileSystem.createDownloadResumable(
      file.uri,
      FileSystem.documentDirectory + file.name,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
    } catch (e) {
      console.log("Error on downloading file", e);
    }
  };

  return { downloadFile, progress };
};
