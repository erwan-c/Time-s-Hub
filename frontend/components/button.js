import { Text, TouchableOpacity } from 'react-native';
import { stylesGlobal } from '../styles';

const Button = ({ text, type = 'primary', onPress }) => {
  return (
    <TouchableOpacity
      style={type === 'primary' ? stylesGlobal.buttonPrimary : stylesGlobal.buttonSecondary}
      onPress={onPress}
    >
      <Text style={type === 'primary' ? stylesGlobal.buttonText : stylesGlobal.buttonPlayText}>{text}</Text>
    </TouchableOpacity>
  );  
};

export default Button;
