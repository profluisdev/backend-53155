import { useState } from "react"
import { Login } from "./components/Login";
import { ItemListContainer } from "./components/ItemListContainer";

export const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = (status) => {
    setIsLogin(status);
  }

  return (
    <div>
      {isLogin ? (
        <ItemListContainer />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  )
}
