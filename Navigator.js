import Chat from "./Components/Chat.js";
import Contacts from "./Components/Contacts.js";

//React Navigation Setup
import { createAppContainer, createSwitchNavigator } from "react-navigation";

const MainNavigator = createSwitchNavigator({
  Contacts: { screen: Contacts },
  Chat: { screen: Chat },
});

const Navigator = createAppContainer(MainNavigator);

export default Navigator;
