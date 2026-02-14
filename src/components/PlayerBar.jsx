import { useContext } from "react";
import { PlayerContext } from "../store/PlayerContext";

export default function PlayerBar() {
  const { queue, currentIndex, playing, toggle, next, prev } = useContext(PlayerContext);
  if (!queue[currentIndex]) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      background: "#181818",
      padding: "15px",
      transition: "transform 0.3s"
    }}>
      <div>{queue[currentIndex].title}</div>
      <button onClick={prev}>⏮</button>
      <button onClick={toggle}>{playing ? "⏸" : "▶"}</button>
      <button onClick={next}>⏭</button>
    </div>
  );
}
