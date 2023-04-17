import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";
import { useEffect } from "react";
import { getRandomContent } from "../reducers/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre,genre }) {
  const content = useSelector(store=>store.movies.movies)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRandomContent({type}))
  }, [dispatch,type,genre]);

  
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "movie" : "series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
            placeholder="genre"
          >
            
            <option ></option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="" />
      <div className="info">
        
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <Link to="/watch" state={{movie:content}} className="link"><span>Play</span></Link>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}