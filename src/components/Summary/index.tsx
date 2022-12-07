import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";
import incomeImg from "../../assets/svg/Entradas.svg";
import outcomeImg from "../../assets/svg/Saidas.svg";
import totalImg from "../../assets/svg/Total.svg";

export function Summary() {
  const { transactions } = useTransactions();

  const { withdraw, deposits, total } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraw: 0,
      total: 0,
    }
  );

  const formatValue = (value: number) =>
    new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatValue(deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-{formatValue(withdraw)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{formatValue(total)}</strong>
      </div>
    </Container>
  );
}
