import { Link } from "react-router-dom";

const PageNotFound = () => {
   return (
      <div
         className="flex flex-col items-center justify-center   
    h-screen bg-gray-100 text-gray-800"
      >
         <h1
            className="text-9xl   
    font-bold"
         >
            404
         </h1>
         <h2 className="text-4xl font-medium">Page Not Found</h2>
         <p className="text-lg mt-4">Oops! It seems like the page you're looking for doesn't exist.</p>
         <p className="text-lg mb-4">Please check the URL or try searching for something else.</p>
         <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Homepage
         </Link>
      </div>
   );
};

export default PageNotFound;
