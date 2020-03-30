// react
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import Input from "../../components/Input";
import Button from "../../components/Button";
import Tag from "../../components/Tag";
// styles
import Styles from "../../assets/styles";
import { Colors } from "../../assets/styles/constants";

interface IAddTags {
  value: string[];
}

let a = 1;
const AddTags: React.FC<IAddTags> = props => {
  const { allTags, tags, setTags } = useTags();
  const [text, setText] = useState("");

  const addTag = () => {
    setTags([...tags, text.trim()]);
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

  return (
    <ScrollView>
      <Text>Add tags</Text>
      <Input label="Add tag" onChangeText={onChangeText} value={text} />
      <View style={[Styles.row, styles.currenTagContainer]}>
        {tags.map((el, i) => (
          <Tag key={i} text={el} onDeletePress={() => deleteTag(i)} />
        ))}
      </View>
      <View style={styles.line} />
      <View style={Styles.row}>
        {allTags.map((el, i) => (
          <Tag key={i} text={el} style={styles.tag} />
        ))}
      </View>
      <Button onPress={addTag}>Add</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  currenTagContainer: {
    marginTop: 18,
    marginBottom: 30
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

export default AddTags;
