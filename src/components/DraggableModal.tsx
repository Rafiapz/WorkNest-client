import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { handleAddModal } from "../store/slices/userSlice";
import TaskForm from "./TaskForm";

const DraggableModal = () => {
   const isOpen = useSelector((state: RootState) => state?.user?.addModal?.isOpen);

   const dispatch = useDispatch<AppDispatch>();

   const closeModal = () => {
      dispatch(handleAddModal(false));
   };

   return (
      <div className="relative ">
         {isOpen && (
            <Draggable>
               <div className="fixed inset-0 flex items-center justify-center z-50 w-auto ">
                  <div className="relative bg-white w-[600px] p-6 rounded-lg shadow-xl border border-green-400 ">
                     <div className="flex justify-between items-center border-b pb-3">
                        <h2 className="text-xl font-semibold">Assign Task</h2>
                        <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
                           &times;
                        </button>
                     </div>
                     <div className="mt-4 ">
                        <TaskForm />
                     </div>
                  </div>
               </div>
            </Draggable>
         )}
      </div>
   );
};

export default DraggableModal;
