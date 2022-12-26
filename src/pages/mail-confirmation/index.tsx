import ComfirmationMsg from "@/components/PopOvers/ComfirmationMsg";
import React, { useState } from "react";
function index() {
  let [isOpen, setIsOpen] = useState(false);
  const confirmationTitle = "An email has been sent to:";
  const confirmationSubtitle = "name@example.com";
  const confirmationImg1 = "/assets/Icon_Shapes.png";
  const hasButton = false;
  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-800 text-white mt-10 rounded-2xl px-10 py-2">
          Mail Confirmation
        </button>
        <ComfirmationMsg
          confirmationMsgTitle={confirmationTitle}
          confirmationsubtitle={confirmationSubtitle}
          confirmationImg={confirmationImg1}
          continueButton={hasButton}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}

export default index;
