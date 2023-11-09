// this will make sure the url starting with https://
export const completeUrl = (url: string) => {
  let modifiedUrl = url;
  if (!modifiedUrl.startsWith('http://') && !modifiedUrl.startsWith('https://')) {
    modifiedUrl = `https://${modifiedUrl}`;
  }

  return modifiedUrl;
};

// change the youtube url to url for iframe embedded url
export const youtubeEmbeddedUrl = (address: string) => {
  if (address.includes('/embed/')) {
    return address;
  }
  const url = new URL(address);
  if (address.includes('youtu.be')) {
    return `https://www.youtube.com/embed/${url.pathname.replace('/', '')}`;
  }
  return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
};
