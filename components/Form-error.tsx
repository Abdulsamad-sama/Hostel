import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 text-destructive rounded-md p-3 flex items-center gap-x-2  text-sm">
      <BsExclamationTriangle className="h-4 w-4" />
      {message}
    </div>
  );
}
