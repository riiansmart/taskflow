// src/components/ErrorMessage.tsx

interface Props {
  message: string | null; // Error message to display
}

const ErrorMessage = ({ message }: Props) => {
  if (!message) return null; // Don't render if no message
  
  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;