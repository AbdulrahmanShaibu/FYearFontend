import React, { useContext } from 'react';

// Assume you have a context like this
const MyContext = React.createContext(null);

function ErrorComponent() {
  // Use useContext to access the context value
  const contextValue = useContext(MyContext);

  // Check if contextValue is not null before destructuring
  if (contextValue !== null) {
    const { basename } = contextValue;
    // Now you can safely use the 'basename' variable
    return <div>{basename}</div>;
  }

  // Handle the case where contextValue is null
  return <div>Context is null</div>;
}

export default ErrorComponent;
