import { useEffect, useState, startTransition } from 'react';
import useAnimation from '@/hooks/useAnimation';
import { useRecoilState } from 'recoil';
import { selectedItem } from '@/recoil/item/atom';
import { TypedIcon } from 'typed-design-system';
import WebViewer from '@/components/viewer/viewer';
import Button from '@/components/button/button';

import './view-page.style.scss';

export default function ViewPage() {
  const [item, setSelectedItem] = useRecoilState(selectedItem);
  const [loading, setLoading] = useState(true);
  const View = useAnimation('loading');

  useEffect(() => {
    if (item) {
      startTransition(() => {
        setLoading(true);
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [item]);

  return (
    <div className="home-container">
      {item && (
        <div className="title-bar">
          <div>{item.title} </div>
          <Button
            noBorder
            fitContent
            onClick={() => {
              setSelectedItem(null);
            }}
          >
            <TypedIcon icon="close_19" />
          </Button>
        </div>
      )}
      {loading ? (
        <div className="loading-wrapper">{View} </div>
      ) : (
        item && (
          <WebViewer
            type={item.type}
            src={item.src as string}
            onLoaded={() => {
              setLoading(false);
            }}
            onError={() => {
              setLoading(false);
            }}
          />
        )
      )}

      {/* <iframe
        width="100%"
        height="100%"
        src="https://www.robinwieruch.de/react-libraries/"
        title="embedded-frame"
        frameBorder="0"
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        // allowFullScreen
      /> */}
    </div>
  );
}
