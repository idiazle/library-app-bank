import { View, Text, StyleSheet } from 'react-native';
import { calculateIncomeExpense } from 'react-native-library-app-bank';
type HeaderMovimientosCustomProps = {
  type?: 'income' | 'expense';
  arrayItems: any[];
};
const HeaderMovements = ({
  type,
  arrayItems,
}: HeaderMovimientosCustomProps) => {
  const result = calculateIncomeExpense(arrayItems);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transacciones Recientes</Text>
        <View style={styles.headerBalance}>
          <View style={styles.containerIncomeExpense}>
            <Text style={styles.titleContainer}>Ingresos</Text>
            <Text style={type === 'income' ? styles.amountPlus : undefined}>
              {result.income}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.containerIncomeExpense}>
            <Text style={styles.titleContainer}>Gastos</Text>
            <Text style={type === 'expense' ? styles.amountMinus : undefined}>
              {result.expense}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>Mostrando 10 de 60 registros</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    backgroundColor: '#6c00f7',
    paddingHorizontal: 20,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingVertical: 10,
    rowGap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
  headerBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    opacity: 0.8,
    borderRadius: 10,
  },
  separator: {
    width: 1.5,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  description: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
  },
  amountPlus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00ff00',
  },
  amountMinus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff0000',
  },
  containerIncomeExpense: {
    flex: 1,
    alignItems: 'center',
    rowGap: 5,
  },
  titleContainer: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HeaderMovements;
