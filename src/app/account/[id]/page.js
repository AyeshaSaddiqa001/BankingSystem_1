"use client";

import Button from "@/components/UI/button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountPage({ params }) {
  useEffect(() => {
    axios
      .get(`/api/account/${params.id}`)
      .then((data) => {
        // console.log(data);
        setAccount(data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }, []);

  const [account, setAccount] = useState(null);

  useEffect(() => console.log(account), [account]);

  return (
    <>
      <main className="ml-48 flex flex-col p-10">
        {account && (
          <div className="w-full flex">
            <div className=" flex flex-col gap-3 w-full">
              <h1 className="text-3xl font-bold">{account.userName}</h1>
              <h5>
                <span className="text-lg font-medium">Account Type:</span>{" "}
                {account.accountType}
              </h5>
              <h5>Balance: ${account.balance} USD</h5>
            </div>
            <div>
              <Button text={"Edit"} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
