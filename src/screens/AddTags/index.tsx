// react
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";

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
      <Text>Текущии теги:</Text>
      {tags.map((el, i) => (
        <>
          <Text style={{ backgroundColor: "grey", marginVertical: 10 }} key={i}>
            {el}
          </Text>
          <IconButton onPress={() => deleteTag(i)} icon="cansel" />
        </>
      ))}
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1
        }}
      />
      <Text>Все теги:</Text>
      {allTags.map((el, i) => (
        <Text style={{ backgroundColor: "grey", marginVertical: 10 }} key={i}>
          {el}
        </Text>
      ))}
      <Button onPress={addTag}>Add</Button>
    </ScrollView>
  );
};

export default AddTags;
