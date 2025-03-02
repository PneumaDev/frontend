import { useContext } from "react";
import { Bell } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { useCookies } from "react-cookie";

export default function Notifications({ closeModal }) {
  const { permission, requestPermission } = useContext(ShopContext);

  const [, setCookie] = useCookies(["notificationRequest"]);

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const setUserCookie = () => {
    setCookie("notificationRequest", "asked", {
      path: "/",
      expires: expirationDate,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-gray-200 shadow-md rounded-lg text-center w-80 py-5 space-y-4">
        <div className="flex flex-col space-x-2 items-center justify-center">
          <Bell className="h-7 w-8 text-blue-500 animate-bounce" />
          <div className="text-gray-600 text-base  font-muktaVaani">
            Turn on notifications and be the first to know about:
            <p className="text-start">✅ Order Updates, </p>
            <p className="text-start">✅ Exclusive Discounts,</p>
            <p className="text-start">✅ New Arrivals.</p>
          </div>
        </div>

        {/* <div className="">
          {permission === "granted" ? (
            <div className="mt-3 flex items-center justify-center space-x-1 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-xs">Notifications Enabled</span>
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-center space-x-1 text-red-600">
              <XCircle className="h-5 w-5" />
              <span className="text-base font-muktaVaani">
                Notifications Blocked
              </span>
            </div>
          )}
        </div> */}

        <div className="flex justify-end space-x-3 px-4">
          <button
            onClick={() => {
              setUserCookie();
              closeModal();
            }}
            className="bg-red-500 text-white px-5 py-2 font-muktaVaani rounded-md hover:bg-red-600 transition duration-200"
          >
            Never
          </button>

          <button
            onClick={requestPermission}
            className="bg-green-600 text-white px-5 py-2 rounded-md font-muktaVaani hover:bg-green-700 transition duration-200"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}
