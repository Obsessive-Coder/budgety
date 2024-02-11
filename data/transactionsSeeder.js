import { Timestamp } from "firebase/firestore";

const baseTransaction = {
  userId: '',
  typeId: '0',
  categoryId: '0', 
  accountId: '0',
  noteId: '0',
  amount: 88.88,
  date: '',
  time: '',
  isRefund: false,
};

export const seedTransactions = async (userId) => {
  const getTransaction = () => ({
    ...baseTransaction,
    typeId: Math.floor(Math.random() * 10),
    categoryId: Math.floor(Math.random() * 10),
    accountId: Math.floor(Math.random() * 10),
    noteId: Math.floor(Math.random() * 2) === 1 ? Math.floor(Math.random() * 10) : null,
    amount: 8888.88,
    date: new Date(),
    time: '4:20 pm',
    isRefund: false,
    userId
  });

  for (let i = 0; i < 10; i++) {
    console.log(getTransaction());
  }
};