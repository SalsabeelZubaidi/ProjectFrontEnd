import React from "react";
import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFaceSmile,
  faFaceAngry,
  faFaceMeh,
  faFaceSmileBeam,
  faFaceTired,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const MoodIconComponent = ({ mood }) => {
  const moodConfigs = {
    smily: {
      icon: faFaceSmile,
      color: "#B1D467",
    },
    smileBeam: {
      icon: faFaceSmileBeam,
      color: "#41A290",
      
    },
    angry: {
      icon: faFaceAngry,
      color: "#7ECD78",
     
    },
    neutral: {
      icon: faFaceMeh,
      color: "#57C785",      
    },
    meh: {
      icon: faFaceMeh,
      color: "#57C785",      
    },
    tired: {
      icon: faFaceTired,
      color: "#2A7B9B"
    },
    null: {
      icon: faCircle,
      color: "#E0E0E0",
      borderColor: "transparent",
    },
  };

  const config = moodConfigs[mood] || moodConfigs["null"];

  return (
    <View style={styles.emojiContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.emojiBtnBase,
          {
            backgroundColor: pressed ? "#d3d3d3" : "white",
            borderColor: config.borderColor || "transparent",
            // borderWidth: 2,
           borderRadius: mood === "tired" ? 30 : 30,
          },
        ]}
      >
        <FontAwesomeIcon
          icon={config.icon || faFaceSmile}
          size={43}
          color={config.color || "grey"}
          style={{opacity: .8}}
        />
      </Pressable>
    </View>
  );
};

const styles = {
  emojiContainer: {
  },
  emojiBtnBase: {
    color:'black'

  },
  fontAwsEmojis: {
    borderColor:'green',
    borderWidth:5

  },
};

export default MoodIconComponent;
