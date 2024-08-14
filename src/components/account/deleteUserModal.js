import axios from "axios";
import Button from "../UI/button";
import { navigate } from "@/lib/redirect";

export default function DeleteUserModal({
  data,
  setData = () => {},
  setShowModal = () => {},
}) {
  function deleteUser() {
    axios
      .delete(`/api/account/${data._id}`, {
        userName: data.userName,
        accountType: data.accountType,
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="absolute z-10 bg-[rgba(0,0,0,0.5)] top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-8 rounded shadow-xl border border-black bg-white flex flex-col gap-2"
      >
        <div className="">Are you sure you want to delete your account?</div>
        <div className="flex gap-2">
          <Button text={"Delete"} func={deleteUser} />
          <Button text={"Cancel"} func={() => setShowModal(false)} />
        </div>
      </form>
    </div>
  );
}
