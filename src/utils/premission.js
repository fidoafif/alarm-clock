//flow
import Expo from "expo";
export const getNotificationPermission = async (): Promise => {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    return false;
  }
  return true;
};

export const setNotificationPermission = async (): Promise => {
  const { Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    return false;
  }
  return true;
};
