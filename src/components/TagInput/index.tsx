// react
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
// components
import Tag from "./Tag";
import Input from "../Input";
import Button from "../Button";

interface ITagInput {
  value?: string[];
  initialText?: string;
  onChange: (event) => void;
}

const TagInput: React.FC<ITagInput> = props => {
  const { value: initialTags = [], value, initialText = "", onChange } = props;
  const [tags, setTags] = useState(initialTags);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    onChange(tags);
  }, [tags]);

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

  return (
    <TouchableOpacity onPress={e => e.stopPropagation()}>
      <Input
        label="Add tag"
        onChangeText={onChangeText}
        value={text}
        disabled
      />
      {tags.map((el, i) => (
        <Text style={{ backgroundColor: "grey", marginVertical: 10 }} key={i}>
          {el}
        </Text>
      ))}
      <Button onPress={addTag}>Add</Button>
    </TouchableOpacity>
  );
};

export default TagInput;
