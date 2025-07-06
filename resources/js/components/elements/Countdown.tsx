import { useEffect, useState } from "react";

type CountdownProps = {
  targetDateTime: string; // Format: ISO string "2025-07-01T14:00:00"
};

const Countdown: React.FC<CountdownProps> = ({ targetDateTime }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(targetDateTime).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update setiap 1 detik

    return () => clearInterval(timer); // Cleanup saat unmount
  }, [targetDateTime]);

  return (
    <div className="flex items-center gap-1 absolute bottom-2 left-2">
      <div className="bg-neutral rounded-md px-3 py-2 text-center">
        <p className="text-danger text-base font-bold">{timeLeft.days}</p>
        <p className="text-xs">Hari</p>
      </div>
      <div className="bg-neutral rounded-md px-3 py-2 text-center">
        <p className="text-danger text-base font-bold">{timeLeft.hours}</p>
        <p className="text-xs">Jam</p>
      </div>
      <div className="bg-neutral rounded-md px-3 py-2 text-center">
        <p className="text-danger text-base font-bold">{timeLeft.minutes}</p>
        <p className="text-xs">Menit</p>
      </div>
      <div className="bg-neutral rounded-md px-3 py-2 text-center">
        <p className="text-danger text-base font-bold">{timeLeft.seconds}</p>
        <p className="text-xs">Detik</p>
      </div>
    </div>
  );
};

export default Countdown;