import { View, Text, StyleSheet, ScrollView } from 'react-native';
type BannerInformativoCustomProps = {
  arrayItems?: string[];
};

const BannerInformativo = ({ arrayItems }: BannerInformativoCustomProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {arrayItems?.map((item, index) => (
          <View key={index} style={styles.targetItem}>
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  targetItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BannerInformativo;
