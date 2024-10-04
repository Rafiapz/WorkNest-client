import React, { Suspense } from "react";
import DraggableModal from "../../components/DraggableModal";
import EditTask from "../../components/EditTask";
import CalendarLoading from "../../components/CalendarLoading";
const MyCalendar = React.lazy(() => import("../../components/MyCalendar"));

const HomePage = () => {
   return (
      <div>
         <Suspense fallback={<CalendarLoading />}>
            <MyCalendar />
         </Suspense>

         <DraggableModal />
         <EditTask />
      </div>
   );
};

export default HomePage;
