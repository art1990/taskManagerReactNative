// react
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import Title from "../../components/Title";
import AddTagInput from "./AddTagInput";
import Button from "../../components/Button";
import Tag from "../../components/Tag";
// styles
import Styles from "../../assets/styles";
import { Colors } from "../../assets/styles/constants";

interface IAddTags {
  value: string[];
}

const AddTags: React.FC<IAddTags> = () => {
  const { allTags, tags: initialTags, addTags } = useTags();
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
    <ScrollView>
      <Title text="Add tags" />
      <AddTagInput
        onChangeText={onChangeText}
        value={text}
        onAddPress={() => addLocalTag()}
      />
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
      </View>
      <Button onPress={() => addTags(tags)}>Done</Button>
    </ScrollView>
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

export default AddTags;
