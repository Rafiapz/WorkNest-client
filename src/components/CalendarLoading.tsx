const CalendarLoading = () => {
   return (
      <div className="flex items-center justify-center h-screen w-screen ">
         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-green-400 border-r-transparent"></div>
         <p className="ml-3 text-gray-500">Loading Calendar...</p>
      </div>
   );
};

export default CalendarLoading;
