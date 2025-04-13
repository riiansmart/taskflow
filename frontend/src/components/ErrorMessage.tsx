// Renders field or server validation errors

interface Props {
    message: string | null; // Error message to display
  }
  
  const ErrorMessage = ({ message }: Props) => {
    if (!message) return null; // Don't render if no message
    return <p className="error-message">{message}</p>; // Show error
  };
  
  export default ErrorMessage;