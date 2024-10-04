import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TaskView: FC<any> = ({ handleEdit, handleDelete, onClose }) => {
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const [assignedEmployees, setAssignedEmployees] = useState<any>(null);
   const task: any = useSelector((state: RootState) => state?.user?.editModal?.currentTask);
   useEffect(() => {
      setAssignedEmployees(task.assignedTo);
   }, [task]);

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
         <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg w-full max-w-lg md:w-2/3 lg:w-1/3 shadow-lg p-6"
         >
            <div className="flex justify-between items-center border-b pb-3 mb-5">
               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{task?.title}</h2>
               <button className="text-gray-500 hover:text-red-500 text-xl" onClick={onClose}>
                  ✕
               </button>
            </div>

            <div className="mb-4">
               <p className="text-gray-600">
                  <strong>Description:</strong> {task?.description || "No description available"}
               </p>
            </div>

            <div className="mb-4">
               <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(task?.date).toLocaleString("en-US", {
                     weekday: "long",
                     month: "long",
                     day: "numeric",
                  })}
               </p>
            </div>

            {userData?.role === "manager" && assignedEmployees?.length > 0 && (
               <div className="mb-4">
                  <p className="text-gray-600">
                     <strong>Assigned Employees:</strong>
                     <ul className="list-disc list-inside">
                        {assignedEmployees.map((employee: any) => (
                           <li key={employee?._id}>{employee?.fullName}</li>
                        ))}
                     </ul>
                  </p>
               </div>
            )}

            {userData?.role === "manager" && (
               <div className="flex justify-end space-x-10 mt-5">
                  <button onClick={handleEdit} className="text-blue-600 hover:text-blue-800 transition">
                     <FontAwesomeIcon icon={faPencilAlt} className="w-6 h-6" />
                  </button>
                  <button onClick={handleDelete} className="text-red-600 hover:text-red-800 transition">
                     <FontAwesomeIcon icon={faTrashAlt} className="w-6 h-6" />
                  </button>
               </div>
            )}
         </motion.div>
      </div>
   );
};

export default TaskView;
