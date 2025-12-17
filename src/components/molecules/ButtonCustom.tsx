import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type ButtonCustomProps = {
  title?: string;
  color?: string;
};

const ButtonCustom = ({ title, color }: ButtonCustomProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color || '#007AFF' }]}
    >
      <Text style={styles.text}>{title || 'Button'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ButtonCustom;
