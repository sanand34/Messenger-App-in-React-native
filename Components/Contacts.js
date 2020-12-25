import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { db } from "../firebase";
import { Avatar, Button, TextInput } from "react-native-paper";

const Contacts = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [text, setText] = useState("");
  const windowHeight = Dimensions.get("window").height;
  useEffect(() => {
    const unsubscribe = db.collection("chat").onSnapshot((snapshot) =>
      setGroups(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const Template = ({ data }) => (
    <View style={styles.container}>
      <View style={styles.text}>
        <Avatar.Text size={50} label="XD" />
        <Text
          style={{
            color: "slateblue",
            fontSize: 30,
            paddingLeft: 30,
            paddingRight: 20,
          }}
        >
          {data.name}
        </Text>
      </View>

      <Button
        color="slateblue"
        style={styles.button}
        icon="chat"
        onPress={() => {
          navigation.navigate("Chat", { id: data.id, name: data.name });
        }}
      >
        Chat
      </Button>
    </View>
  );
  return (
    <View>
      <TextInput
        label="Create Group"
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => {
          setText("");
          db.collection("chat").add({ name: text });
        }}
      />
      <ScrollView style={{ padding: 5, height: windowHeight * 0.8 }}>
        {groups.map((group) => (
          <Template key={group.id} data={group} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    flexDirection: "column",
    borderColor: "grey",
    borderWidth: 0.5,
    borderTopColor: "white",
  },
  text: {
    width: 340,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    margin: 10,
  },
});
