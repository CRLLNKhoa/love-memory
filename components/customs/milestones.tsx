"use client";
import { useEffect, useState } from "react";
const loveStart = new Date("2025-10-30");
const girlBirthday = new Date("2004-07-01");
const boyBirthday = new Date("2000-05-12");
export default function Milestones({ ...props }: any) {
  const getNextMonthAnniversary = (startDate: string | Date) => {
    const start = new Date(startDate);
    const today = new Date();

    let monthsPassed =
      (today.getFullYear() - start.getFullYear()) * 12 +
      (today.getMonth() - start.getMonth());

    const nextMonth = new Date(start);
    nextMonth.setMonth(start.getMonth() + monthsPassed + 1);

    return nextMonth;
  };

  const getYearAnniversaryInfo = (startDate: string | Date) => {
    const start = new Date(startDate);
    const today = new Date();

    let yearsPassed = today.getFullYear() - start.getFullYear();

    // tạo mốc kỷ niệm năm nay
    let next = new Date(today.getFullYear(), start.getMonth(), start.getDate());

    // nếu năm nay đã qua thì tăng lên năm sau
    if (next.getTime() < today.getTime()) {
      yearsPassed += 1;
      next.setFullYear(today.getFullYear() + 1);
    }

    return {
      nextDate: next,
      anniversaryNumber: yearsPassed,
    };
  };

  const isComingSoon = (days: number) => {
    return days <= 7 && days >= 0;
  };

  const getNextBirthday = (birthday: string | Date) => {
    const birth = new Date(birthday);
    const today = new Date();

    let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

    if (next.getTime() < today.getTime()) {
      next.setFullYear(today.getFullYear() + 1);
    }

    return next;
  };
  const getDaysLeft = (date: string | Date) => {
    const today = new Date();
    const target = new Date(date); // ép sang Date

    const diff = target.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nextMonth = getNextMonthAnniversary(loveStart);
  const nextBirthdayGirl = getNextBirthday(girlBirthday);
  const nextBirthdayBoy = getNextBirthday(boyBirthday);
  const yearInfo = getYearAnniversaryInfo(loveStart);

  const daysToMonth = getDaysLeft(nextMonth);
  const daysToBirthdayGirl = getDaysLeft(nextBirthdayGirl);
  const daysToBirthdayBoy = getDaysLeft(nextBirthdayBoy);

  const events = [
    {
      title: `Sinh nhật ${props.girlName}`,
      date: nextBirthdayGirl, // ✅ Date thật
      daysLeft: daysToBirthdayGirl,
    },
    {
      title: `Sinh nhật ${props.boyName}`,
      date: nextBirthdayBoy,
      daysLeft: daysToBirthdayBoy,
    },
    {
      title: "Kỷ niệm tháng",
      date: nextMonth,
      daysLeft: daysToMonth,
    },
    {
      title: `Kỷ niệm ${yearInfo.anniversaryNumber} năm`,
      date: yearInfo.nextDate,
    },
  ];

  const sortedEvents = events
    .map((event: any) => ({
      ...event,
      daysLeft: getDaysLeft(event.date),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex items-center gap-3">
        <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold select-none">
          Sự kiện sắp tới
        </h2>
      </div>

      {sortedEvents.map((event, index) => (
        <div key={index} className="space-y-4">
          {/* ----------- */}
          <div
            className={`font-bold text-slate-900 dark:text-slate-100 rounded-xl shadow transition-all duration-300 flex items-center p-4 ${
              isComingSoon(event.daysLeft)
                ? "bg-pink-100 border-2 border-pink-500 animate-pulse"
                : "bg-white"
            }`}
          >
            <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
              <span className="material-symbols-outlined text-2xl">✦︎</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-slate-100">
                Sinh Nhật {event.title}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ngày {new Date(event.date).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-primary font-bold">{event.daysLeft} Ngày</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Còn lại
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
