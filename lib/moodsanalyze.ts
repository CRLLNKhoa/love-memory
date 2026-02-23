type MoodObject = Record<
  string,
  {
    total: number;
    color: string;
    bg: string;
    label: string;
    users?: any;
  }
>;

export const analyzeRelationship = (moods: MoodObject) => {
  if (!moods) return null;

  const entries = Object.entries(moods);

  const totalAll = entries.reduce(
    (sum, [, mood]) => sum + (mood.total ?? 0),
    0,
  );

  if (totalAll === 0) {
    return {
      status: "Chưa có dữ liệu",
      message:
        "Hai bạn chưa ghi nhận cảm xúc nào. Hãy bắt đầu lưu lại những khoảnh khắc cùng nhau.",
      score: 0,
    };
  }

  const percent = (key: string) => ((moods[key]?.total ?? 0) / totalAll) * 100;

  const happy = percent("happy");
  const calm = percent("calm");
  const miss = percent("miss");
  const sad = percent("sad");
  const angry = percent("angry");
  const jealous = percent("jealous");

  const positive = happy + calm;
  const negative = sad + angry;

  const score = Math.round(Math.max(0, Math.min(100, positive - negative / 2)));

  const sorted = entries.sort((a, b) => b[1].total - a[1].total);
  const topMood = sorted[0];
  const dominantLabel = topMood[1].label;
  const dominantColor = topMood[1].color;
  const dominantPercent = ((topMood[1].total / totalAll) * 100).toFixed(0);

  // -------- Logic phân tích --------

  if (positive >= 70) {
    return {
      status: "Rất hạnh phúc",
      message: `Cảm xúc tích cực chiếm ${positive.toFixed(
        0,
      )}%. "${dominantLabel}" đang nổi bật (${dominantPercent}%). Mối quan hệ đang ở giai đoạn rất ngọt ngào và ổn định.`,
      score,
      dominantColor,
    };
  }

  if (positive >= 50 && negative < 30) {
    return {
      status: "Khá tích cực",
      message: `Phần lớn cảm xúc là tích cực (${positive.toFixed(
        0,
      )}%). Tuy vẫn có một chút dao động, nhưng nhìn chung hai bạn đang giữ được sự cân bằng tốt.`,
      score,
      dominantColor,
    };
  }

  if (negative >= 50) {
    return {
      status: "Đang căng thẳng",
      message: `Cảm xúc tiêu cực chiếm ${negative.toFixed(
        0,
      )}%. "${dominantLabel}" đang chiếm ưu thế. Có thể hai bạn đang cần một cuộc trò chuyện nghiêm túc để hiểu nhau hơn.`,
      score,
      dominantColor,
    };
  }

  if (miss >= 30) {
    return {
      status: "Nhớ nhung nhiều",
      message: `"${dominantLabel}" chiếm ${dominantPercent}%. Có vẻ hai bạn đang rất quan tâm và nghĩ về nhau, có thể đang xa nhau hoặc rất gắn bó.`,
      score,
      dominantColor,
    };
  }

  return {
    status: "Cân bằng cảm xúc",
    message: `Mood nổi bật là "${dominantLabel}" (${dominantPercent}%). Tổng thể cảm xúc khá tự nhiên, có cả vui buồn đan xen — điều này hoàn toàn bình thường trong một mối quan hệ.`,
    score,
    dominantColor,
  };
};
