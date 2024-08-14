import axios from "axios";
import Button from "../UI/button";
import { navigate } from "@/lib/redirect";
import { useState } from "react";
import Toast from "../UI/toast";

export default function WithdrawModal({
  data,
  setData = () => {},
  setShowModal = () => {},
}) {
  function withdrawMoney() {
    axios
      .post(`/api/account/${data._id}/withdraw`, {
        amount: amount,
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
      })
      .catch((err) => {
        // console.log(err);
        hanldeError(err.response.data);
      });
  }

  function hanldeError(message) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="absolute z-10 bg-[rgba(0,0,0,0.5)] top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      {error !== "" && <Toast message={error} />}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-8 rounded shadow-xl border border-black bg-white flex flex-col gap-2"
      >
        <fieldset className="flex gap-2 items-center">
          <label htmlFor="amount">Amount</label>
          <input
            className="border border-black px-2 py-1 rounded"
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
            id="amount"
          />
        </fieldset>
        <div className="flex gap-2">
          <Button text={"Withdraw"} func={withdrawMoney} />
          <Button text={"Cancel"} func={() => setShowModal(false)} />
        </div>
      </form>
    </div>
  );
}
