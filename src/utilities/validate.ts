export const validateUrl = (url: string) => {
  const urlRegex = /(((https?:\/\/)(www\.)?)[^\s]+)/g;
  return url.match(urlRegex) !== null;
};

export const isYoutube = (url: string) => {
  return url.includes('//youtu.be') || url.includes('youtube.com/');
};
