import ComfirmationMsg from "@/components/PopOvers/ComfirmationMsg";
import React, { useState } from "react";

function index() {
  let [isOpen, setIsOpen] = useState(false);
  const confirmationMsgHeader = "You have sucessfully connected to Fireblocks!";
  const confirmationMsg = "";
  const confirmationImage = "/assets/Icon_Shapes.png";
  const hasButton = true;
  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-800 text-white mt-10 rounded-2xl px-10 py-2">
          Fireblock Connect
        </button>
        <ComfirmationMsg
          confirmationMsgTitle={confirmationMsgHeader}
          confirmationsubtitle={confirmationMsg}
          confirmationImg={confirmationImage}
          continueButton={hasButton}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}

export default index;
