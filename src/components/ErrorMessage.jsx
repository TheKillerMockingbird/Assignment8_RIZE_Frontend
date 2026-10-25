function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <h3>Something went wrong</h3>
      <p>{message || "Failed to load data. Please try again."}</p>
    </div>
  );
}

export default ErrorMessage;