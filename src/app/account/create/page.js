"use client";

import Button from "@/components/UI/button";
import Toast from "@/components/UI/toast";
import { navigate } from "@/lib/redirect";
import axios from "axios";
import { useState } from "react";

export default function CreateAccount() {
  function showToastMessage(message) {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function showAlreadyExistsMesage() {
    setShowAlreadyExists(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(userName, accountType);
    axios
      .post(
        "/api/account",
        {
          userName: userName,
          accountType: accountType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        showToastMessage("Registered Account");
        navigate("/");
      })
      .catch((e) => {
        if (e.response.status === 409) {
          showAlreadyExistsMesage();
          setAlreadyRegisteredAccount(e.response.data.account[0]);
          console.log(e.response.data);
        }

        showToastMessage(e.response.data.error);
      })
      .finally(() => {});
  }

  const [userName, setUserName] = useState("");
  const [accountType, setAccountType] = useState("Personal");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAlreadyExists, setShowAlreadyExists] = useState(false);
  const [alreadyResgisteredAccount, setAlreadyRegisteredAccount] =
    useState(null);

  return (
    <>
      {showToast && <Toast message={toastMessage} />}
      <main className="container h-screen mx-auto  flex flex-col items-center justify-center">
        <div className="grow flex items-center">
          <h1 className="text-4xl font-bold text-center">Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} className=" grow">
          <div className="flex flex-col gap-2 border border-black rounded-xl p-5 shadow-xl h-max">
            <fieldset className="flex gap-2 items-center">
              <label htmlFor="userName">User Name</label>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                  setShowAlreadyExists(false);
                }}
                value={userName}
                required
                type="text"
                id="userName"
                className="border border-black px-2 py-1 rounded"
              />
            </fieldset>
            <fieldset className="flex gap-2 items-center">
              <label htmlFor="accountType">Account Type</label>
              <select
                onChange={(e) => {
                  setAccountType(e.target.value);
                  setShowAlreadyExists(false);
                }}
                name="accountType"
                id="accountType"
                className="bg-white border border-black rounded px-1"
              >
                <option value="Personal" defaultValue={accountType}>
                  Personal
                </option>
                <option value="Business">Business</option>
              </select>
            </fieldset>
            <div className="w-full flex items-start">
              <Button text="Create" />
            </div>
            {showAlreadyExists && (
              <p className="text-center">
                Account Already exists! Go to{" "}
                <a
                  className="underline"
                  href={`/account/${alreadyResgisteredAccount._id}`}
                >
                  page?
                </a>
              </p>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
