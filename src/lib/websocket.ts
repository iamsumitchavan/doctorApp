// export const createWebSocketConnection = (
//   onMessage: (data: any) => void
// ): WebSocket => {
//   const ws = new WebSocket("http://localhost:3000"); // WebSocket server URL

//   ws.onopen = () => {};

//   ws.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     onMessage(data);
//   };

//   ws.onerror = (error) => {
//     console.error("WebSocket error", error);
//   };

//   ws.onclose = () => {
//     console.log("WebSocket connection closed");
//   };

//   return ws;
// };
