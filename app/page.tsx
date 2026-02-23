"use client";

import Nav from "@/components/customs/nav";
import HeroCounter from "@/components/customs/hero-counter";
import FeaturedMoment from "@/components/customs/featured-moment";
import Milestones from "@/components/customs/milestones";
import Avatar from "@/components/customs/avatar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // chỉnh theo path của bạn
import { useEffect, useState } from "react";
import { ChartBarDefault } from "@/components/customs/chart-bar-default";
import { useCoupleMoods } from "@/hooks/useMood";

export default function CoupleHeader() {
  const [girlName, setGirlName] = useState("Cục Đất");
  const [boyName, setBoyName] = useState("Mây Trắng");
  const [quote, setQuote] = useState("Every day with you...");
  const [girlAvatar, setGirlAvatar] = useState("...");
  const [boyAvatar, setBoyAvatar] = useState("...");
  const [loading, setLoading] = useState(true);

  const { moods, totalMood } = useCoupleMoods("moods");
  const getProfile = async () => {
    try {
      const docRef = doc(db, "couple", "profile");
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();

        setGirlName(data.girlName || "");
        setBoyName(data.boyName || "");
        setQuote(data.quote || "");
        setGirlAvatar(data.girlAvatar || "");
        setBoyAvatar(data.boyAvatar || "");

        setLoading(false);
      } else {
        console.log("No such document 😢");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Đang tải kỉ niệm 💞...</p>
      </div>
    );
  }

  return (
    <main className=" bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen overflow-auto no-scrollbar">
      <Nav />
      <Avatar
        girlName={girlName}
        boyName={boyName}
        since="30/10/2025"
        quote={quote}
        boyAvatar={boyAvatar}
        girlAvatar={girlAvatar}
      />
      <HeroCounter />
      <FeaturedMoment
        title="Ảnh kỉ niệm"
        date="30/10/2025"
        location="Hanoi"
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCvGCMRGYAE-Gf-X_iA4QsaZdTnxZcdAXJqop6Fv2h73TPC_JSU0_12per3-V8Y4Tb-PX0EuFaw74XW6tb8ot7udurw1Llb8MFcYHkQaIiyuitS_4IQ-j_Yi6ZPbkAbLX25LywTwmzNGkwca4l1q244m-qiYqS6YO3ni9YWZioq5JA3_ptIQDrn42NN0yjhmn6ZPQTq5bHMmtbPuxFNZBqxkL_Qzuw9ZUgRGEniVWJSb6Ha2YyYe8dtikEZz7jjCZWocRY4OEVgrFw"
      />
      <Milestones boyName={boyName} girlName={girlName} />
      <ChartBarDefault data={moods} total={totalMood} />
    </main>
  );
}
function setGirlName(arg0: any) {
  throw new Error("Function not implemented.");
}
