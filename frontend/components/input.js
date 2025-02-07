import { TextInput } from "react-native";
import { stylesGlobal } from "../styles";

const Input = ({ placeholder, value, onChangeText, secure, numeric }) => {
  return (
    <TextInput
      secureTextEntry={secure}
      keyboardType={numeric ? "numeric" : "default"} 
      style={stylesGlobal.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor='#c6c6c6'
    />
  );
};

export default Input;
