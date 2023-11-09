import { useEffect, useState, startTransition } from 'react';
import useAnimation from '@/hooks/useAnimation';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { selectedItem } from '@/recoil/item/selector';
import useToast from '@/hooks/useToast';
import { selectedId } from '@/recoil/item/atom';
import { TypedIcon } from 'typed-design-system';
import WebViewer from '@/components/viewer/viewer';
import Button from '@/components/button/button';

import './view-page.style.scss';

export default function ViewPage() {
  const resetSelection = useResetRecoilState(selectedId);
  const item = useRecoilValue(selectedItem);
  const [loading, setLoading] = useState(false);
  const { refresh, showAnimation } = useAnimation('loading');
  const showToast = useToast();

  useEffect(() => {
    if (item && item.id >= 0) {
      startTransition(() => {
        setLoading(true);
      });
    } else {
      setLoading(false);
    }
  }, [item?.id]);

  useEffect(() => {
    if (loading) {
      refresh();
    }
  }, [loading]);

  return (
    <div className="home-container">
      {item && (
        <div className="title-bar">
          <div>{item.title} </div>
          <Button
            noBorder
            fitContent
            onClick={() => {
              resetSelection();
            }}
          >
            <TypedIcon icon="close_19" />
          </Button>
        </div>
      )}
      {loading && <div className="loading-wrapper">{showAnimation()}</div>}
      {item && (
        <WebViewer
          type={item.type}
          src={item.src as string}
          onLoaded={() => {
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
            showToast('Failed to load resource! Recoure may be corrupted.', 'error');
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
        />
      )}
    </div>
  );
}
