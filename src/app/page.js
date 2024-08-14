"use client";

import Card from "@/components/UI/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get("/api/account").then((data) => {
      setAccounts(data.data);
    });
    // .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    // console.log(accounts);
  }, [accounts]);

  return (
    <main className="flex flex-col container mx-auto h-screen">
      <h1 className="w-full flex items-center justify-center text-center text-4xl font-bold grow">
        User Accounts
      </h1>
      <div className="flex flex-col mt-10 gap-3 grow">
        {accounts.length > 0 ? (
          accounts.map((account, idx) => {
            return <Card key={idx} account={account} />;
          })
        ) : (
          <p className="text-xl font-medium text-center">
            No accounts registered!
          </p>
        )}
      </div>
    </main>
  );
}
