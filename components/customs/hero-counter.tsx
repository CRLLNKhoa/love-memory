"use client";
import { useEffect, useState } from "react";
const START_DATE = new Date(2025, 10, 30);
export default function HeroCounter() {
  // 🔥 Cố định ngày bắt đầu ở đây

  const convertDays = (totalDays: number) => {
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = totalDays % 30;

    return { years, months, days };
  };

  const [days, setDays] = useState(0);
  const result = convertDays(days);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      setDays(Math.floor(diff / 86400000));
    };

    calculate();
  }, []); // luôn cố định

  return (
    <section className="text-center py-12 lg:py-16">
      <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-4">
        Hành trình của đôi ta
      </span>
      <h1 className="text-primary text-6xl lg:text-8xl font-extrabold tracking-tighter mb-2">
        {Number(days).toLocaleString("en-US")}
      </h1>

      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {result.years > 0 && `${result.years} năm `}
        {result.months > 0 && `${result.months}`} tháng {result.days} ngày
      </p>
      <p className="text-slate-900 dark:text-slate-100 text-2xl lg:text-3xl font-bold tracking-tight mb-2">
        Ngày ở bên nhau
      </p>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        Lần gặp đầu tiên vào ngày 30, tháng 10, năm 2025
      </p>
    </section>
  );
}
