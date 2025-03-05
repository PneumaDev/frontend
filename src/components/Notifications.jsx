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
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-md">
      🔔 Enable notifications for updates!
      <button
        onClick={requestNotificationPermission}
        className="ml-2 bg-white text-blue-500 px-2 py-1 rounded"
      >
        Allow
      </button>
    </div>
  );
}
