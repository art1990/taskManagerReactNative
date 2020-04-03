// react
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
// components
import Tag from "../../../components/Tag";
import Button from "../../../components/Button";
// styles
import Styles from "../../../assets/styles";
import { Colors } from "../../../assets/styles/constants";

interface ITagView {
  allTags: string[];
  initialTags: string[];
  Input?: React.FC<any>;
  buttonText: string;
  buttonAction: (arr: string[]) => void;
}

const TagView: React.FC<ITagView> = ({
  allTags,
  initialTags,
  Input,
  buttonAction,
  buttonText
}) => {
  const [text, setText] = useState("");
  const [tags, setTags] = useState(initialTags);

  const addLocalTag = (tag?: string) => {
    setTags([...tags, tag || text.trim()]);
    setText("");
  };

  const onChangeText = event => {
    setText(event);
  };

  const deleteTag = i => {
    const copyTags = [...tags];
    copyTags.splice(i, 1);

    setTags(copyTags);
  };

  const filteredAllTags = allTags.filter(el => !tags.includes(el));

  return (
    <>
      {Input && (
        <Input
          onChangeText={onChangeText}
          value={text}
          onAddPress={() => addLocalTag()}
        />
      )}
      <View style={[Styles.row, styles.currenTagContainer]}>
        {tags.map((el, i) => (
          <Tag
            key={i}
            text={el}
            onDeletePress={() => deleteTag(i)}
            style={styles.tag}
          />
        ))}
      </View>
      <View style={styles.line} />
      <View style={Styles.row}>
        {filteredAllTags.map((el, i) => (
          <Tag key={i} text={el} style={styles.tag} setTags={setTags} />
        ))}
        <Button onPress={() => buttonAction(tags)}>{buttonText}</Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  currenTagContainer: {
    marginBottom: 10
  },
  line: {
    borderBottomColor: Colors.line,
    borderBottomWidth: 1
  },
  tag: {
    marginHorizontal: 7,
    marginVertical: 18
  }
});

export default TagView;
