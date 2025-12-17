import { View, Text, StyleSheet } from 'react-native';
type Props = {
  category?: string;
  date?: string;
  amount?: number;
  description?: string;
  type?: 'income' | 'expense';
};

const CardTransaction = ({
  category,
  date,
  amount,
  description,
  type,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={type === 'income' ? styles.income : styles.expense}>
        <Text
          style={type === 'income' ? styles.incomeText : styles.expenseText}
        >
          {category}
        </Text>
      </View>
      <View style={styles.textMiddle}>
        <Text>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text
        style={type === 'income' ? styles.incomeAmount : styles.expenseAmount}
      >
        {type === 'income' ? '+' : '-'} {amount?.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textMiddle: {
    flex: 1,
    rowGap: 5,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  income: {
    padding: 5,
    backgroundColor: '#79f696ff',
    borderRadius: 10,
    width: '20%',
    alignItems: 'center',
  },
  incomeText: {
    fontSize: 8,
  },
  expense: {
    padding: 5,
    backgroundColor: '#f48a92ff',
    borderRadius: 10,
    width: '20%',
    alignItems: 'center',
  },
  expenseText: {
    fontSize: 8,
  },
  incomeAmount: {
    color: 'green',
    fontWeight: '500',
  },
  expenseAmount: {
    color: 'red',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});

export default CardTransaction;
