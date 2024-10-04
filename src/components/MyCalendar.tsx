import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { handleAddModal, handleEditModal, handleSelectedDate } from "../store/slices/userSlice";
import { fetchMyTasks } from "../store/actions/userActions";
import TaskView from "./TaskView";
import toast from "react-hot-toast";
import { deleteTask } from "../service/api";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
   const selectedDate = useSelector((state: RootState) => state?.user?.selectedDate);
   // const isLoading = useSelector((state: RootState) => state?.user?.myTasks?.loading);
   const events: any = useSelector((state: RootState) => state?.user?.myTasks?.data);
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const [task, setTask] = useState<any>(null);
   const [showViewModal, setShowViewModal] = useState(false);
   const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
      dispatch(fetchMyTasks());
   }, []);

   const dayPropGetter = (date: Date) => {
      if (selectedDate && moment(date).isSame(selectedDate, "day")) {
         return {
            className: "bg-green-100",
         };
      }
      return {};
   };

   const handleSelectSlot = (slotInfo: any) => {
      if (userData?.role === "manager") {
         dispatch(handleSelectedDate(slotInfo.start));
         openModal();
      }
   };

   const handleSelectEvent = (task: any, e: any) => {
      if (e.target.className.includes("rbc-event-content")) {
         setTask(task);
         dispatch(handleEditModal({ task, status: false }));
         setShowViewModal(true);
      }
   };

   const openModal = () => {
      dispatch(handleAddModal(true));
   };

   const handleEdit = () => {
      dispatch(handleEditModal({ status: true, task }));
      setShowViewModal(false);
   };
   const handleDelete = async () => {
      try {
         const id: string = task?._id;
         await deleteTask(id);
         toast.success("Task deleted");
         setShowViewModal(false);
         dispatch(fetchMyTasks());
      } catch (error: any) {
         toast.error("Failed to delete task");
         console.log(error, "fall");
      }
   };
   const onClose = () => {
      setShowViewModal(false);
   };

   return (
      <>
         <div className="mt-32">
            {events && (
               <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  selectable={true}
                  onSelectSlot={handleSelectSlot}
                  dayPropGetter={dayPropGetter}
                  views={["month", "agenda"]}
                  onSelectEvent={handleSelectEvent}
                  className="font-bold uppercase"
                  eventPropGetter={() => {
                     return {
                        style: {
                           backgroundColor: "#34D399",
                        },
                     };
                  }}
               />
            )}
         </div>
         {showViewModal && <TaskView handleEdit={handleEdit} handleDelete={handleDelete} onClose={onClose} />}
      </>
   );
};

export default MyCalendar;
