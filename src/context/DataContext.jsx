import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setLoggedUser(user.user);
      setToken(user.token);
      setConfig({
        headers: {
          authorization: `bearer ${user.token}`,
        },
      });
    }

    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  // handle login

  const handleLogin = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedUser(response.data.user);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle register

  const handleRegister = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", data);
      toast.success(response.data.message);
      toast.success("Check your Mail & Activate");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setIsLoading(false);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      setIsLoading(false);
    }
  };

  // handle confirm user

  const handleConfirm = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      await api.patch(`/auth/confirm/${resetToken}`);
      toast.success("Account confirmed Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  //handle forgot password

  const handleForgot = async (data) => {
    setIsLoading(true);

    try {
      await api.put("/auth/forgotPassword", data);
      toast.success("Reset link send to your mail");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle reset Password
  const handleReset = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/auth/resetPassword/${resetToken}`,
        data
      );
      setResetToken("");
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle logout

  const handleLogout = () => {
    setToken(null);
    setLoggedUser(null);
    setConfig(null);
    localStorage.clear();
  };

  const fetchAllPost = async () => {
    try {
      const response = await api.get("/posts", config);
      setPosts(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        token,
        setToken,
        resetToken,
        setResetToken,
        isLoading,
        setIsLoading,
        navigate,
        config,
        setConfig,
        handleRegister,
        handleLogin,
        handleConfirm,
        handleForgot,
        handleReset,
        handleLogout,
        posts,
        fetchAllPost,
        trigger,
        setTrigger,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
