import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function ProfileScreen({ navigation }) {
  const [{}, dispatch] = useStateValue();

  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate("Login");

          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          });
        }}
      >
        Sign out
      </Button>
    </View>
  );
}

export default ProfileScreen;
