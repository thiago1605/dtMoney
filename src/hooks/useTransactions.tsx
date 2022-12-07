import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
  type: string;
}

type TransactionInputProps = Omit<Transaction, "id" | "createdAt">;

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInputProps) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
