import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";
const Chat = ({ navigation }) => {
  const [text, setText] = useState("");
  const windowHeight = Dimensions.get("window").height;
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("chat")
      .doc(navigation.getParam("id"))
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  const Template = ({ message }) => (
    <View style={{ marginBottom: 15 }}>
      <View
        style={
          user.user.name == message.name ? styles.container2 : styles.container1
        }
      >
        <Text style={{ color: "#694fad" }}>{message.message}</Text>
      </View>
      <View
        style={
          user.user.name == message.name
            ? { flexDirection: "row", justifyContent: "flex-end" }
            : { flexDirection: "row" }
        }
      >
        <Avatar.Text size={24} label="XD" />
        <Text style={styles.text}>{message.name}</Text>
      </View>
    </View>
  );
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 40 }}>
        {navigation.getParam("name")}
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("Contacts");
        }}
      >
        Back
      </Button>

      <ScrollView
        style={{
          padding: 5,
          height: windowHeight * 0.68,
        }}
      >
        {messages.map((message) => (
          <Template message={message} />
        ))}
      </ScrollView>
      <View>
        <TextInput
          label="Enter Message"
          value={text}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => {
            db.collection("chat")
              .doc(navigation.getParam("id"))
              .collection("messages")
              .add({
                message: text,
                name: user?.user.name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            setText("");
          }}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container1: {
    marginRight: 100,
    borderRadius: 100,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20,
    borderColor: "lightgrey",
    borderWidth: 5,
  },
  container2: {
    marginLeft: 100,

    borderRadius: 100,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-around",
    padding: 20,
    borderColor: "#694fad",
    borderWidth: 5,
  },
  text: { color: "grey", paddingLeft: 10 },
});
