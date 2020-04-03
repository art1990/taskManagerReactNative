// react
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import Tag from "../../components/Tag";
// styles
import Styles from "../../assets/styles";
import { Colors } from "../../assets/styles/constants";

interface IAddTags {
  allTags: string[];
  initialTags: string[];
  addTags: () => void;
}

const AddTags: React.FC<IAddTags> = ({ allTags, initialTags, addTags }) => {
  const [tags, setTags] = useState(initialTags);

  const addLocalTag = (tag?: string) => {
    setTags([...tags, tag || text.trim()]);
  };

  const deleteTag = i => {
    const copyTags = [...tags];
    copyTags.splice(i, 1);

    setTags(copyTags);
  };

  const filteredAllTags = allTags.filter(el => !tags.includes(el));

  return (
    <>
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

export default AddTags;
