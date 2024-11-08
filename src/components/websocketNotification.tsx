// // components/WebSocketNotification.tsx

// import { useEffect, useState } from "react";
// import { createWebSocketConnection } from "../lib/websocket";

// const WebSocketNotification: React.FC = () => {
//   const [notification, setNotification] = useState<string | null>(null);

//   useEffect(() => {
//     const ws = createWebSocketConnection((data: { message: string }) => {
//       setNotification(data.message);
//     });

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div>
//       {notification && (
//         <div className="fixed top-0 right-0 mt-4 mr-4 bg-green-500 text-white p-4 rounded">
//           {notification}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebSocketNotification;
