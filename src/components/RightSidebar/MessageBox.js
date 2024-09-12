import React, { useEffect, useState } from "react";

import LeftChatBubble from "./LeftChatBubble";
import { useDispatch } from "react-redux";
import RightChatBubble from "./RightChatBubble";
import MessageInput from "./MessageInput";
import { addNewMessage } from "../../actions/contact";
import ProfileHeader from "../LeftSidebar/ProfileHeader";
function MessageBox(props) {
  const [chat, setChat] = useState([]);
  const [length, setLength] = useState();
  const dispatch = useDispatch();
  useEffect(() => {


    setChat(props.user.chatlog);
    setLength(props.user.chatlog.length);
  }, [props]);
  var time;
  var hours;
  var minutes;
  function currentTime() {
  var currentDate = new Date();
  hours = currentDate.getHours();
  hours = hours % 12 || 12;
  hours = appendZero(hours);

  // hours = appendZero(currentDate.getHours());
  minutes = appendZero(currentDate.getMinutes());
  var seconds = appendZero(currentDate.getSeconds());
  const am = "AM";
  const pm = "PM";
   const timeZone = hours <= 12 ? am : pm;

  time = `${hours}:${minutes}:${seconds} ${timeZone}`;

  }

  function appendZero(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}


setInterval(currentTime, 1000);



  let updateMesssages = (message) => {
    let object = {
      text: message,
      timestamp: time,
      sender: "me",
      message_id: length + 1,
    };
    dispatch(addNewMessage(object, props.user.id));
    // updatelength
    setLength(object.message_id);

    setChat([...chat, object]);
  };

  return (
    <>
      <div className="message-box">
        <div className="message-box-header" xs={6} sm={7} md={8} lg={7} xl={8}>
          <ProfileHeader user={props.user} />
        </div>
        {chat.length === 0 && (
          <p className="no-message-alert">NO MESSAGES FOUND</p>
        )}
        {chat.length > 0 && (
          <div className="messages-section">
            {chat.map((m, index) =>
              m.sender === "me" ? (
                <RightChatBubble
                  message={m}
                  key={index}
                  name={"Gouranga Charan Mishra"}
                  image={"data:image/jpeg;base64,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"}
                />
              ) : (
                <LeftChatBubble
                  message={m}
                  key={index}
                  name={props.user.name}
                  image={props.user.image}
                />
              )
            )}
          </div>
        )}

        <MessageInput newMessageHandler={updateMesssages} user={props.user} />
      </div>
    </>
  );
}

export default MessageBox;