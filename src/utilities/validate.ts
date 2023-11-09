// make sure if the url starts with https:// or http://
export const validateUrl = (url: string) => {
  const urlRegex = /(((https?:\/\/)(www\.)?)[^\s]+)/g;
  return url.match(urlRegex) !== null;
};

// check if the url is youtube url
export const isYoutube = (url: string) => {
  return url.includes('//youtu.be') || url.includes('youtube.com/');
};
