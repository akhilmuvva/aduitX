import { useEffect, useRef } from 'react';
import { animate, type JSAnimation } from 'animejs';

type AnimateParams = Parameters<typeof animate>[1];

export const useAnime = (
  params: AnimateParams & { targets: string | Element | Element[] | NodeList },
  dependencies: unknown[] = [],
  playOnMount = true
) => {
  const animeRef = useRef<JSAnimation | null>(null);

  useEffect(() => {
    const { targets, ...rest } = params;
    animeRef.current = animate(targets as any, {
      ...rest,
      autoplay: playOnMount,
    });

    return () => {
      animeRef.current?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    play: () => animeRef.current?.play(),
    pause: () => animeRef.current?.pause(),
    restart: () => animeRef.current?.restart(),
  };
};
