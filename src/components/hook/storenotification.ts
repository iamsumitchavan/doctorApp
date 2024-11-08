import axios from 'axios';

type NotificationData = {
  message: string;
  date: string;
  time: string;
  notificationType: string;
  doctorName: string;
};

export const useNotification = () => {
  const now = new Date();

  const day = now.getDate();
  const month = now.toLocaleString('default', { month: 'short' }).toLowerCase();
  const year = now.getFullYear();
  const formattedDate = `${day}${month} ${year}`;

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;

  const storeNotificationData = async (data: NotificationData) => {
    const response = await axios.post('/api/notification', data);

    return response.data;
  };

  return { storeNotificationData, formattedDate, formattedTime };
};
