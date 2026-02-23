"use client";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
  coupleId: string;
};

export default function InitMoodButton({ coupleId }: Props) {
  const handleInit = async () => {
    try {
      await setDoc(
        doc(db, "couple", coupleId),
        {
          moods: {
            happy: {
              label: "Hạnh phúc",
              color: "#FFC83D",
              bg: "#FFF4CC",
              total: 0,
              users: {},
            },
            miss: {
              label: "Nhớ",
              color: "#A78BFA",
              bg: "#F3E8FF",
              total: 0,
              users: {},
            },
            calm: {
              label: "Bình yên",
              color: "#60A5FA",
              bg: "#DBEAFE",
              total: 0,
              users: {},
            },
            jealous: {
              label: "Ghen",
              color: "#F43F5E",
              bg: "#FFE4E6",
              total: 0,
              users: {},
            },
            sad: {
              label: "Buồn",
              color: "#64748B",
              bg: "#E2E8F0",
              total: 0,
              users: {},
            },
            angry: {
              label: "Giận",
              color: "#F97316",
              bg: "#FFEDD5",
              total: 0,
              users: {},
            },
          },
        },
        { merge: true },
      );

      alert("Init mood thành công");
    } catch (error) {
      console.error(error);
      alert("Init thất bại");
    }
  };

  return (
    <button
      onClick={handleInit}
      className="px-4 py-2 rounded-xl text-white bg-black"
    >
      Init Moods
    </button>
  );
}
