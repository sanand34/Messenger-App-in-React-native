import React from "react";
import { View, Text } from "react-native";
import { useStateValue } from "./StateProvider";
import { Avatar, Headline } from "react-native-paper";
import Navigator from "./Navigator.js";
import Login from "./Login";
export default function Body() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 25,
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={60}
          style={{ marginRight: 30 }}
          source={{
            uri: user?.user.photoUrl,
          }}
        />
        <Headline>
          <Text style={{ color: "grey" }}>{user?.user.name}</Text>
        </Headline>
      </View>

      <Login />
      {user ? <Navigator /> : <View></View>}
    </View>
  );
}
