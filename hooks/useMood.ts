"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export const useCoupleMoods = (coupleId: string) => {
  const [moods, setMoods] = useState<any>(null);
  const [isLoadingMood, setLoading] = useState(true);
  const [totalMood, setTotalMood] = useState({});

  useEffect(() => {
    if (!coupleId) return;

    const unsubscribe = onSnapshot(doc(db, "couple", coupleId), (snapshot) => {
      const data = snapshot.data();
      setTotalMood(data || {});
      setMoods(data?.moods || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [coupleId]);

  return { moods, isLoadingMood, totalMood };
};
