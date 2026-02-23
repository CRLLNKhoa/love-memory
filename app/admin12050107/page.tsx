"use client";
import EditProfile from "@/components/customs/EditProfile";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";

function AdminPage() {
  const [loading, setLoading] = useState(false);
  const handleAddMood = async (moodKey: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "couple", "moods"), {
        [`moods.${moodKey}.total`]: increment(1),
      });
      setLoading(false);
      alert("Updated 💞");
    } catch (error) {
      console.error(error);
    }
  };

  const moods = {
    happy: { label: "Hạnh phúc", color: "#FFC83D" },
    miss: { label: "Nhớ", color: "#A78BFA" },
    calm: { label: "Bình yên", color: "#60A5FA" },
    jealous: { label: "Ghen", color: "#F43F5E" },
    sad: { label: "Buồn", color: "#64748B" },
    angry: { label: "Giận", color: "#F97316" },
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-center flex-wrap gap-4">
        {Object.entries(moods).map(([key, mood]: any) => (
          <button
            disabled={loading}
            key={key}
            onClick={() => handleAddMood(key)}
            style={{ background: mood.color }}
            className="px-4 py-2 rounded-xl text-white"
          >
            {mood.label}
          </button>
        ))}
      </div>
      <EditProfile
        profile={{
          girlName: "",
          boyName: "",
          quote: "",
          girlAvatar: "",
          boyAvatar: "",
        }}
      />
    </div>
  );
}

export default AdminPage;
