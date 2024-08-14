"use client";

import Button from "@/components/UI/button";
import Toast from "@/components/UI/toast";
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
      })
      .catch((e) => {
        if (e.response.status === 409) {
          showAlreadyExistsMesage();
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

  return (
    <>
      {showToast && <Toast message={toastMessage} />}
      <main className="ml-48 h-max flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 border border-black rounded-xl p-5 shadow-xl"
        >
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
              <span className="underline">page?</span>
            </p>
          )}
        </form>
      </main>
    </>
  );
}
