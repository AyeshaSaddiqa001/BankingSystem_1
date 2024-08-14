"use client";

import EditUserModal from "@/components/account/editUserModal";
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

  useEffect(getAccount, [showEditUserModal]);

  return (
    <>
      <main className="container mx-auto flex flex-col p-10">
        <h1 className="w-full text-center text-4xl font-bold">
          Account Details
        </h1>
        {account && (
          <>
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
                  <span className="text-lg font-medium">Account Type:</span>{" "}
                  {account.accountType}
                </h5>
                <h5>Balance: ${account.balance} USD</h5>
              </div>
              <div>
                <Button text={"Edit"} func={() => setShowEditUserModal(true)} />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
