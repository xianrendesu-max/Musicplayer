import { createContext, useState, useRef, useEffect } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const playTrack = async (track, list) => {
    setQueue(list);
    const index = list.findIndex(t => t.videoId === track.videoId);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (currentIndex < 0 || !queue[currentIndex]) return;

    async function start() {
      const video = queue[currentIndex];
      const res = await fetch(`/api/streamurl?video_id=${video.videoId}`);
      audioRef.current.src = res.url;
      await audioRef.current.play();
      setPlaying(true);
    }

    start();
  }, [currentIndex]);

  const next = () => {
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * queue.length));
    } else if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (repeat) {
      setCurrentIndex(0);
    }
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const toggle = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    audioRef.current.onended = next;
  });

  return (
    <PlayerContext.Provider value={{
      queue,
      currentIndex,
      playing,
      shuffle,
      repeat,
      setShuffle,
      setRepeat,
      playTrack,
      toggle,
      next,
      prev
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
