import { useUser } from "./hooks/useUser";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import axios from "axios";
import { WithReactScroll } from "./WithReactScroll";

const LIMIT_MESSAGE = 10;

export default function ChatApp() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);
  const [totalMessage, setTotalMessage] = useState(0);
  const [page, setPage] = useState(1);
  const [userReceiver, setUserReceiver] = useState("");
  const user = useUser();
  const access_token = localStorage.getItem("access_token");
  const username = [
    {
      name: "tuan90",
      value: "user687a0447066c6407e737f2aa",
    },
    {
      name: "tuan91",
      value: "user68c28cd5010eeb0438b3aef2",
    },
    {
      name: "tuan93",
      value: "user68c28cd5010eeb0438b3aef2",
    },
  ];

  const getProfile = async (name) => {
    const userData = await axios.get(`http://localhost:3000/users/${name}`);
    setUserReceiver(userData.data.result._id);
  };

  const getConversation = async (page) => {
    const res = await axios.get(
      `http://localhost:3000/conversations/receiver/${userReceiver}?limit=${LIMIT_MESSAGE}&page=${page}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const { conversations, total } = res.data.result;
    const newData = conversations.map((c) => ({
      ...c,
      isSender: c.sender_id === user._id,
    }));
    setTotalMessage(total);
    setMessage((prev) => [...prev, ...newData]);
  };

  useEffect(() => {
    if (!user) return;

    if (socket.connected) {
      socket.disconnect();
    }
    socket.auth = { _id: user._id };
    socket.connect();
    socket.on("received_message", (data) => {
      console.log("data", data);
      const { payload } = data;
      setMessage((prev) => [{ ...payload, isSender: false }, ...prev]);
    });
    return () => {
      socket.disconnect();
      setMessage([]);
    };
  }, [user]);

  useEffect(() => {
    if (!userReceiver) return;
    getConversation(page);
  }, [userReceiver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
    socket.emit("send_message", {
      payload: {
        content: value,
        sender_id: user._id,
        receiver_id: userReceiver,
      },
    });
    setMessage((prev) => [
      {
        content: value,
        sender_id: user._id,
        receiver_id: userReceiver,
        isSender: true,
        _id: Math.random().toString(36).substring(7),
      },
      ...prev,
    ]);
  };
  console.log("message", message);
  return (
    <div>
      <h2>{`Message i'm ${user?.email}`}</h2>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {username.map((user, index) => (
          <button onClick={() => getProfile(user.value)} key={index}>
            {user.name}
          </button>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: 5,
          padding: 20,
          width: "500px",
          // minHeight: "5vh",
          // maxHeight: "60vh",
          overflowY: "auto",
          margin: "0 auto",
        }}
      >
        <div>
          <WithReactScroll
            message={message}
            fetchData={getConversation}
            setPage={setPage}
            totalMessage={totalMessage}
          />
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "400px",
            height: "30px",
            marginTop: "10px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{ backgroundColor: "red", color: "white" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
