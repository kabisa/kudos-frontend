type CurrencyProps = {
  amount: number;
};

const Currency = ({ amount }: CurrencyProps) => {
  return <>{amount}₭</>;
};

export default Currency;
