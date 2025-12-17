import { View, Text, StyleSheet } from 'react-native';

type HeaderCustomProps = {
  title?: string;
};

const Header = ({ title }: HeaderCustomProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textCenter}>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    height: 50,
  },
  textCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    columnGap: 2,
  },
});

export default Header;
