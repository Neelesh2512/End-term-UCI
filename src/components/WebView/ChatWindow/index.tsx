import React, { useEffect, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import styles from "./index.module.css";
import MessageWindow from "./MessageWindow";
import TextBar from "./TextBar";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import {useColorModeValue } from "@chakra-ui/react";

interface chatWindowProps {
  messages: any[];
  username: string;
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  toSendMessage: (text: string, media: any) => void;
  currentUser: {name: string; number: string | null};
  sendLocation: (location: string) => void;
}

const ChatWindow: React.FC<chatWindowProps> = ({
  messages,
  username,
  selected,
  toSendMessage,
  currentUser,
  sendLocation,

}) => {

  const backgroundColorToggle = useColorModeValue(styles.lightContainer,styles.darkContainer)
  const backBoxToggle = useColorModeValue(styles.lightBackBox,styles.darkBackBox)
  const headingColorToggle = useColorModeValue(styles.lightUsername,styles.darkUsername)

  let classname = localStorage.getItem("wallpaper");




  return (
    <Flex
      className={`${styles.container}`}
    >
      {/* Top Section */}
      <Box className={`${styles.top_section} ${backgroundColorToggle}`}>
        {/* Name and Icon */}
        
        <Flex>
            <Box className={styles.avatarContainer}>
            <Box className={styles.innerRing} />
          </Box>
          <Box className={`${styles.UserName} ${headingColorToggle}`}>
            {currentUser.name}
          </Box>
          <div id="google_translate_element"></div>
        </Flex>

        <Box className={styles.toggleButtonContainer}>
          <ColorModeSwitcher />
        </Box>
      </Box>

      {/* Chat Window */}
      <Box  className={`${styles.chatWindow} ${backgroundColorToggle}`}>
        {/* NeoMorphism Box */}
        
          <Box className={`${styles.BackBox} ${backBoxToggle}`}>
          <Box id="wall" className={  classname === "wallpaper1" ? styles.wallpaper1 
                          : classname === "wallpaper2" ? styles.wallpaper2
                          : styles.BackBox  }>
          {/* <Box className={classname}> */}
            {/* Chat Area */}
            <Box style={{minHeight:"90px"}}>
              <MessageWindow
                messages={messages}
                username={username}
                selected={selected}
              />
            </Box>

            {/* TextBar */}
            <Box className={styles.inputSection}>
              <TextBar onSend={toSendMessage} onSendLocation={sendLocation} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatWindow;
