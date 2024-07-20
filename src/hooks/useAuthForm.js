import { useState } from 'react';

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return {
    isLogin,
    handleSwitch,
  };
};
