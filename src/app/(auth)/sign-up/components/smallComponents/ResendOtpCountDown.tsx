import React, { useEffect, useState } from "react";

function ResendOtpCountDown({
  activate,
  enable,
}: {
  activate: () => void;
  enable: boolean;
}) {
  const [countDown, setCountDown] = useState(59);

  // restart countdown
  useEffect(() => {
    if (!enable) {
      setCountDown(59);
    }
  }, [enable]);

  // Timer
  useEffect(() => {
    if (countDown === 0) {
      activate();
      return;
    }
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDown]);

  return <div>{countDown}</div>;
}

export default ResendOtpCountDown;
