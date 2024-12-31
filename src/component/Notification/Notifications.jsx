// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axiosInstance from "../axiosInstance";
// // import axiosInstance from "../axiosInstance";
// // import useGetId from "../../hooks/useGetId";
// // import axiosInstance from "../axiosInstance";
// // import dotenv from "dotenv"
// // dotenv.config() ;


// const socket = io("http://localhost:5173"); // Adjust the URL as needed
// // const socket = io( process.env.NODE_ENV === 'production'
// //   ? process.env.REACT_APP_SOCKET_URL
// //   : 'http://localhost:5173'); // Adjust the URL as needed

// const Notifications = ({userId}) => {
//   const [notifications, setNotifications] = useState([]);
//   // const userId = useGetId()
//   // console.log("userId",userId)
//   useEffect(() => {
//     socket.emit("join", userId);

//     socket.on("newNotification", (notification) => {
//       setNotifications((prevNotifications) => [
//         notification,
//         ...prevNotifications,
//       ]);
//     });

//     return () => {
//       socket.off("newNotification");
//     };
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const response = await axiosInstance.get(`/admin/notifications`);
//       setNotifications(response.data);
//     };

//     fetchNotifications();
//   },[userId]);
//   // useEffect(() => {
//   //   const markAsRead = async (id) => {
//   //     try {
//   //       await axiosInstance.patch(`/admin/notifications/${id}/read`);
//   //       setNotifications(prevNotifications =>
//   //         prevNotifications.map(notification =>
//   //           notification._id === id ? { ...notification, read: true } : notification
//   //         )
//   //       );
//   //     } catch (error) {
//   //       console.error('Error marking notification as read:', error);
//   //     }
//   //   };

//   //   // Mark notifications as read when they are fetched and displayed
//   //   notifications.forEach(notification => {
//   //     if (!notification.read) {
//   //       markAsRead(notification._id);
//   //     }
//   //   });
//   // }, [notifications]);
//   return (
//     <div
//       className={`block w-full bg-[#FFFFFF]  m-1 p-1 font-Inter overflow-y-scroll`}
//     >
//       <div>
//         <div>
//           <div className="mb-4 px-4 py-4 w-full">
//             <div>
//               <span className="text-[#3B3935] font-Inter text-base md:text-lg font-semibold">
//                 Notification
//               </span>
//             </div>
//             <div className="h-[75vh] overflow-y-scroll w-full">
//               <table
//                 align="middle"
//                 className="mb-0 w-full min-h-[65vh] overflow-y-scroll"
//               >
//                 <div className="w-full">
//                   {notifications.map((notification) => (
//                     <div
//                       key={notification._id}
//                       className="w-full flex items-center justify-bweeen   py-2 px-2"
//                       style={{ backgroundColor: notification.read ? 'grey' : 'white' }}
//                     >
//                       <div className="p-2 mr-4">
//                         <div className="h-2 w-2 rounded-[1rem] bg-[#F89D28]"></div>
//                       </div>
//                       <div className="grow">
//                         <span className="font-DMSans text-sm flex flex-col m-0">
//                           <p className="text-[#3B3935] font-bold m-0">
//                             {notification.title}
//                           </p>
//                           <p className="text-[#888888] font-normal m-0">
//                             {notification.message}
//                           </p>
//                         </span>
//                       </div>
//                       <div className="w-[5%]">
//                         <span>10h</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;
