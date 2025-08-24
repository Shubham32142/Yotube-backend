import { useRouteError } from "react-router-dom";
const ErrorElement = () => {
  const error = useRouteError();
  console.log({ error });
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <h1 className="text-xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-4">
          Something went wrong. Please try again later.
        </p>
        <p className="text-sm text-gray-500">
          {error?.data || "An unexpected error occurred."}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Are you sure this is the right path? I don&#39;t think so.
        </p>
      </div>
    </div>
  );
};
export default ErrorElement;
