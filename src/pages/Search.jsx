import { useState, useContext } from "react";
import { PlayerContext } from "../store/PlayerContext";

export default function Search() {
  const [results, setResults] = useState([]);
  const { playTrack } = useContext(PlayerContext);

  const search = async (q) => {
    const res = await fetch(`/api/search?q=${q}`);
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div className="page">
      <input onKeyDown={(e)=>e.key==="Enter"&&search(e.target.value)} />
      {results.map(v => (
        <div className="card" key={v.videoId}
          onClick={()=>playTrack(v, results)}>
          {v.title}
        </div>
      ))}
    </div>
  );
}
