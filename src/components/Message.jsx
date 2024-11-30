import { useState, useEffect } from 'react';

const Message = ({ text, type = 'success' }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [text]);

  if (!visible) return null;

  const styles = {
    success: {
      container: 'fixed top-4 right-4 flex items-center p-4 bg-green-100 border-l-4 border-green-500 rounded-lg shadow-md',
      iconClass: 'text-green-600 text-xl mr-3',
      icon: '✓',
    },
    error: {
      container: 'fixed top-4 right-4 flex items-center p-4 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-md',
      iconClass: 'text-red-600 text-xl mr-3',
      icon: '✕',
    }
  };

  const currentStyle = styles[type];

  return (
    <div className={`${currentStyle.container}`}>
      <div className={currentStyle.iconClass}>{currentStyle.icon}</div>
      <p className="text-sm text-gray-800">{text}</p>
    </div>
  );
};

export default Message;
