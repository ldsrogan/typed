export const completeUrl = (url: string) => {
  let modifiedUrl = url;
  if (!modifiedUrl.startsWith('http://') && !modifiedUrl.startsWith('https://')) {
    modifiedUrl = `https://${modifiedUrl}`;
  }

  return modifiedUrl;
};

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

//  const handlePreview = useCallback(async () => {
//     if (url) {
//       let videoUrl = url;
//       if (!videoUrl.startsWith('http')) {
//         videoUrl = `https://${videoUrl}`;
//       }
//       let res: any;
//       setValidating(true);
//       try {
//         if (process.env.NODE_ENV === 'production') {
//           res = await client.get(`https://${window.location.host}/og`, {
//             params: {
//               url: videoUrl,
//             },
//           });
//         } else {
//           res = await client.get(`${process.env.REACT_APP_FE_URL}/og`, {
//             params: {
//               url: videoUrl,
//             },
//           });
//         }
//         if (res.data.images.length > 0) {
//           const img = await getMeta(res.data.images[0]);
//           if (img.width < 65) {
//             res.data.images = [];
//           }
//           setImgSize({ width: img.width, height: img.height });
//         }

//         if (res.data.mediaType.includes('video')) {
//           setPreview(res.data);
//           changedValidation(res.data);
//         } else {
//           setPreview(null);
//           changedValidation();
//           setNotVideo(true);
//         }
//       } catch (e: any) {
//         changedValidation();
//       }

//       setValidating(false);
//     }
//   }, [url, notVideo]);
