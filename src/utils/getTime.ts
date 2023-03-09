export const getTimeDif = (time: number): string => {
  const nowTimeInMinutes = Math.floor(Date.now() / 60000);
  const diffMinutes = nowTimeInMinutes - Math.floor(time / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffMonths = Math.round(diffDays / 31);
  const diffYears = Math.round(diffMonths / 12);

  if (diffMinutes <= 1) return `${diffMinutes} minute ago`;
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours == 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return `${diffDays} day ago`;
  if (diffDays < 31) return `${diffDays} days ago`;
  if (diffMonths === 1) return `${diffMonths} month ago`;
  if (diffMonths < 12) return `${diffMonths} months ago`;
  if (diffMonths === 12) return `${diffYears} year ago`;
  else return `${diffYears} years ago`;
};

export const getDataString = (time: number): string => {
  const dateCreate = new Date(time * 1000).toLocaleDateString('en-GB');
  return dateCreate;
};
