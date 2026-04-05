import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 text-emerald-500 rounded-md p-3 flex items-center gap-x-2  text-sm">
      <IoIosCheckmarkCircleOutline className="h-4 w-4" />
      {message}
    </div>
  );
}
