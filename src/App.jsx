import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const fetchData = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        const { data } = await axios.get("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        localStorage.setItem('user', JSON.stringify(data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
