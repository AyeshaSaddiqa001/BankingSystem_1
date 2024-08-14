export default function TransactionCard({ transaction, idx }) {
  return (
    <>
      <div
        key={idx}
        className="p-4 w-full flex border border-black rounded shadow-lg items-center"
      >
        <div className="flex flex-col gap-1 w-full">
          {" "}
          <p>{transaction.description}</p>
          <p className="text-sm">
            <span className="font-medium">Amount: </span>
            {"$"}
            {transaction.amount}
          </p>
        </div>
        <div className="shrink-0">
          {new Date(transaction.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </>
  );
}
