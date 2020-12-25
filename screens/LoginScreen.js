import React from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";
import * as Google from "expo-google-app-auth";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const IOS_CLIENT_ID =
  "";
const ANDROID_CLIENT_ID =
  "";

function LoginScreen({ navigation }) {
  const [{}, dispatch] = useStateValue();

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);

        const doc = await db.collection("rooms").doc(result.user.email).get();
        if (!doc.exists) {
          console.log("No Data");
        } else {
          dispatch({
            type: actionTypes.SET_USER,
            user: result,
          });
        }

        navigation.navigate("Profile"); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  return (
    <View>
      <Button
        onPress={() => {
          signInWithGoogle();
        }}
      >
        Login with Google
      </Button>
    </View>
  );
}

export default LoginScreen;
