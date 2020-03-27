import React, { useState } from "react";
import { Button, Paragraph, Dialog as D, Portal } from "react-native-paper";

interface IDialog {
  isVisible: boolean;
}

const Dialog: React.FC<IDialog> = ({ isVisible }) => {
  const [visible, setVisible] = useState<boolean>(isVisible);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <D visible={visible} onDismiss={this._hideDialog}>
        <D.Title>Alert</D.Title>
        <D.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </D.Content>
        <D.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </D.Actions>
      </D>
    </Portal>
  );
};

export default Dialog;
