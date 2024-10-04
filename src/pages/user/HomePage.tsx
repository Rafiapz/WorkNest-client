import DraggableModal from "../../components/DraggableModal";
import EditTask from "../../components/EditTask";
import MyCalendar from "../../components/MyCalendar";

const HomePage = () => {
   return (
      <div>
         <MyCalendar />
         <DraggableModal />
         <EditTask />
      </div>
   );
};

export default HomePage;
