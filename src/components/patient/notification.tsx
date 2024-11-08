'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import type { notificationProps } from '@/types';
import { useCountStore } from '@/zstore/notificationStore';

import BackNavigation from '../common/backPage';
import NotificationListStructurePage from './NotificationList';

export default function NofitcationList() {
  const [notificationList, setNotificationList] = useState<notificationProps[]>(
    [],
  );
  const { setCount } = useCountStore();

  const FetchData = async () => {
    await axios.get('api/notification').then((response) => {
      setNotificationList(response.data);
    });
  };

  const handleClick = async (id: string) => {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    };

    const response = await fetch('/api/notification', requestOptions);

    if (response.ok) {
      FetchData();
    }
  };

  useEffect(() => {
    FetchData();
    setCount(notificationList?.length);
  }, []);
  return (
    <div className="space-y-9">
      <BackNavigation title="Notification" />
      <div className="flex flex-col gap-2">
        {notificationList?.map((notification: notificationProps) => {
          return (
            <NotificationListStructurePage
              key={notification.id}
              when={notification.date}
              time={notification.time}
              message={notification.message}
              notification={
                notification.notificationType === 'success'
                  ? 'success'
                  : notification.notificationType === 'cancel'
                    ? 'cancel'
                    : notification.notificationType === 'changed'
                      ? 'changed'
                      : 'reschedule'
              }
              handleClick={handleClick}
              id={notification.id}
            />
          );
        })}

        {/* <NotificationListStructurePage
          when="Today"
          time="15:36 PM"
          message="You have successfully canceled your appointment with Dr. kumar Das on December 24, 2024,"
          notification="changed"
        />
        <NotificationListStructurePage
          when="Today"
          time="15:36 PM"
          message="You have successfully canceled your appointment with Dr. kumar Das on December 24, 2024,"
          notification="reschedule"
        />
        <NotificationListStructurePage
          when="Today"
          time="15:36 PM"
          message="You have successfully canceled your appointment with Dr. kumar Das on December 24, 2024,"
          notification="success"
        /> */}
      </div>
    </div>
  );
}
