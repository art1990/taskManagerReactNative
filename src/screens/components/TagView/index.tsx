// react
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
// components
import Tag from "../../../components/Tag";
import Button from "../../../components/Button";
// styles
import Styles from "../../../assets/styles";
import { Colors } from "../../../assets/styles/constants";
// types
import { ITagViewProps } from "../../../types";

const TagView: React.FC<ITagViewProps> = ({
  allTags,
  initialTags,
  Input,
  buttonAction,
  buttonText,
}) => {
  const [text, setText] = useState("");
  const [tags, setTags] = useState(initialTags || []);

  const addLocalTag = (tag?: string) => {
    if (!text) return;
    setTags([...(tags || []), tag || text.trim()]);
    setText("");
  };

  const onChangeText = (event) => {
    setText(event);
  };

  const deleteTag = (i) => {
    if (tags.length === 1) return setTags(null);

    const copyTags = [...tags];
    copyTags.splice(i, 1);

    setTags(copyTags);
  };

  const filteredAllTags = allTags.filter((el) => !tags?.includes(el));

  return (
    <>
      {Input && (
        <Input
          onChangeText={onChangeText}
          value={text}
          onAddPress={() => addLocalTag()}
        />
      )}
      <ScrollView>
        <View style={[Styles.row, styles.currenTagContainer]}>
          {tags?.map((el, i) => (
            <Tag key={i} text={el} onDeletePress={() => deleteTag(i)} />
          ))}
        </View>
        <View style={styles.line} />
        <View style={Styles.row}>
          {filteredAllTags.map((el, i) => (
            <Tag key={i} text={el} setTags={setTags} />
          ))}
        </View>
      </ScrollView>
      <Button style={styles.button} onPress={() => buttonAction(tags)}>
        {buttonText}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  currenTagContainer: {
    marginBottom: 10,
    minHeight: 50,
  },
  line: {
    borderBottomColor: Colors.line,
    borderBottomWidth: 1,
  },

  button: {
    marginTop: "auto",
  },
});

export default TagView;
