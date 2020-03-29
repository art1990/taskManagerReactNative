// react
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import Input from "../../components/Input";
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
    setTags(tags.splice(i, 1));
  };

  console.log(a++, tags);
  return (
    <View>
      <Text>Add tags</Text>
      <Input label="Add tag" onChangeText={onChangeText} value={text} />
      {allTags.map((el, i) => (
        <Text style={{ backgroundColor: "grey", marginVertical: 10 }} key={i}>
          {el}
        </Text>
      ))}
      <Button onPress={addTag}>Add</Button>
    </View>
  );
};

export default AddTags;
