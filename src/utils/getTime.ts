export const getTimeDif = (time: number): string => {
  const nowTimeInMinutes = Math.floor(Date.now() / 60000);
  const diffMinutes = nowTimeInMinutes - Math.floor(time / 60);
  if (diffMinutes <= 1) {
    return `${diffMinutes} minute ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (Math.round(diffMinutes / 60) == 1) {
    return '1 hour ago';
  } else {
    return `${Math.round(diffMinutes / 60)} hours ago`;
  }
};
export const getDataString = (time: number): string => {
  const dateCreate = new Date(time * 1000).toLocaleDateString('en-GB');
  return dateCreate;
};
