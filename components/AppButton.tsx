import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  ButtonProps
} from '@ant-design/react-native'

const AppButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <Button {...props} style={styles.container}>
    {props.children}
  </Button>
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24
  },
});