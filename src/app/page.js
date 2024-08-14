"use client";

import Card from "@/components/UI/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/account")
      .then((data) => {
        setAccounts(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    console.log(accounts);
  }, [accounts]);

  return (
    <main className="flex container mx-auto border border-black">
      {accounts.map((account, idx) => {
        return <Card key={idx} account={account} />;
      })}
    </main>
  );
}
