//flow
import { Notifications, Permissions } from "expo";

export const setNotification = async (): Promise => {
  Notifications.addListener((EventSubcription: object) => {
    console.log(EventSubcription.data);
  });
};
