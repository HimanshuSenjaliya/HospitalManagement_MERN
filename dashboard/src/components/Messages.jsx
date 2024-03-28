/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        // toast.error(error.response.data.message)
        console.log("ERROR OCCURED WHILE FETCHING MESSAGES : ", error);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    navigateTo("/login");
  }

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name : <span>{element.firstName}</span>{" "}
                  </p>
                  <p>
                    Last Name : <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email : <span>{element.email}</span>
                  </p>
                  <p>
                    Phone Number : <span>{element.phone}</span>
                  </p>
                  <p>
                    Message : <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages !</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
