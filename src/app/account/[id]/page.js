"use client";

import DeleteUserModal from "@/components/account/deleteUserModal";
import DepositModal from "@/components/account/depositModal";
import EditUserModal from "@/components/account/editUserModal";
import TransactionCard from "@/components/account/transactionCard";
import WithdrawModal from "@/components/account/withdrawModal";
import Button from "@/components/UI/button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountPage({ params }) {
  function getAccount() {
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
  }

  useEffect(getAccount, []);

  const [account, setAccount] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteuserModal, setShowDeleteUserModal] = useState(false);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(getAccount, [
    showEditUserModal,
    showDepositModal,
    showWithdrawModal,
  ]);

  return (
    <>
      <main className="container mx-auto flex flex-col p-10">
        <h1 className="w-full flex items-center justify-center text-center text-4xl font-bold grow">
          Account Details
        </h1>
        <div className="grow flex flex-col">
          {account && (
            <>
              {showDepositModal && (
                <DepositModal
                  data={account}
                  setShowModal={setShowDepositModal}
                />
              )}
              {showWithdrawModal && (
                <WithdrawModal
                  data={account}
                  setShowModal={setShowWithdrawModal}
                />
              )}
              {showDeleteuserModal && (
                <DeleteUserModal
                  setShowModal={setShowDeleteUserModal}
                  data={account}
                />
              )}
              {showEditUserModal && (
                <EditUserModal
                  setShowModal={setShowEditUserModal}
                  data={account}
                />
              )}
              <div className="w-full mt-10 flex">
                <div className=" flex flex-col gap-3 w-full">
                  <h1 className="text-2xl font-bold">
                    Username: {account.userName}
                  </h1>
                  <h5>
                    <span className="text-lg font-medium">Account Type:</span>
                    {account.accountType}
                  </h5>
                  <h5>Balance: ${account.balance} USD</h5>
                </div>
                <div className="flex gap-3 items-center">
                  <Button
                    text={"Edit"}
                    func={() => setShowEditUserModal(true)}
                  />
                  <Button
                    text={"Delete"}
                    func={() => setShowDeleteUserModal(true)}
                  />
                  <Button
                    text={"Deposit"}
                    func={() => setShowDepositModal(true)}
                  />
                  <Button
                    text={"Withdraw"}
                    func={() => setShowWithdrawModal(true)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-10 items-center">
                <h1 className="w-full flex items-center justify-center text-center text-4xl font-bold grow mb-10">
                  Account Transactions
                </h1>
                {account.transactions.length > 0 ? (
                  account.transactions.map((transaction, idx) => {
                    return <TransactionCard transaction={transaction} />;
                  })
                ) : (
                  <p className="text-2xl font-medium">No transactions yet!</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
