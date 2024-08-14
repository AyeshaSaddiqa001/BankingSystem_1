import axios from "axios";
import Button from "../UI/button";
import { useState } from "react";
import Toast from "../UI/toast";

export default function EditUserModal({
  data,
  setData = () => {},
  setShowModal = () => {},
}) {
  function patchUser() {
    axios
      .patch(`/api/account/${data._id}`, {
        userName: userName,
        accountType: accountType,
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [userName, setUserName] = useState(data.userName);
  const [accountType, setAccountType] = useState(data.accountType);

  return (
    <div className="absolute z-10 bg-[rgba(0,0,0,0.5)] top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-8 rounded shadow-xl border border-black bg-white flex flex-col gap-2"
      >
        <fieldset className="flex gap-2 items-center">
          <label htmlFor="userName">User Name</label>
          <input
            className="border border-black px-2 py-1 rounded"
            required
            type="text"
            id="userName"
            defaultValue={data.userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="flex gap-2 items-center">
          <label htmlFor="accountType">Account Type</label>
          <select
            name="accountType"
            id="accountType"
            defaultValue={data.accountType}
            className="bg-white border border-black rounded px-1"
            onChange={(e) => {
              setAccountType(e.target.value);
            }}
          >
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
          </select>
        </fieldset>
        <div className="flex gap-2">
          <Button text={"Change"} func={patchUser} />
          <Button text={"Cancel"} func={() => setShowModal(false)} />
        </div>
      </form>
    </div>
  );
}
