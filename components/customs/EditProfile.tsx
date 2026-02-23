"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function EditProfile({ profile }: any) {
  const [girlName, setGirlName] = useState(profile.girlName);
  const [boyName, setBoyName] = useState(profile.boyName);
  const [quote, setQuote] = useState(profile.quote);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "couple", "profile"), {
        girlName,
        boyName,
        quote,
        girlAvatar,
        boyAvatar,
        updatedAt: new Date().getTime(),
      });

      alert("Updated 💞");
    } catch (error) {
      console.error(error);
      alert("Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };
  const [girlAvatar, setGirlAvatar] = useState(profile.girlAvatar);
  const [boyAvatar, setBoyAvatar] = useState(profile.boyAvatar);

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow">
      <input
        value={girlName}
        onChange={(e) => setGirlName(e.target.value)}
        placeholder="Girl Name"
        className="input"
      />

      <input
        value={boyName}
        onChange={(e) => setBoyName(e.target.value)}
        placeholder="Boy Name"
        className="input"
      />

      <textarea
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Quote"
        className="input"
      />

      {/* Avatar URL */}
      <div className="space-y-3">
        <input
          value={girlAvatar}
          onChange={(e) => setGirlAvatar(e.target.value)}
          placeholder="Girl Avatar URL"
          className="input"
        />

        <input
          value={boyAvatar}
          onChange={(e) => setBoyAvatar(e.target.value)}
          placeholder="Boy Avatar URL"
          className="input"
        />
      </div>

      {/* Preview */}
      <div className="flex gap-6">
        {girlAvatar && (
          <img
            src={girlAvatar}
            className="w-20 h-20 rounded-full object-cover border"
          />
        )}

        {boyAvatar && (
          <img
            src={boyAvatar}
            className="w-20 h-20 rounded-full object-cover border"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-primary text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
