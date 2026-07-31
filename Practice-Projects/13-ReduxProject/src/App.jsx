import React from "react";
import { fetchGIFs, fetchPhotos, fetchVideos } from "./api/mediaApi";

const App = () => {
  const getPhotos = async () => {
    const data=await fetchPhotos('cat');
    console.log(data)
  };
const getVideos=async()=>{
    const data=await fetchVideos("cat")
    console.log(data)

}
const getGIFs=async()=>{
  const data=await fetchGIFs("cat")
  console.log(data)
}
  return (
    <div className="h-screen w-full bg-gray-700  text-white">
      <button onClick={() => getPhotos()}>Get Photos</button>
      <button onClick={() => getVideos()}>Get Videos</button>
      <button onClick={() => getGIFs()}>Get Gifs</button>
    </div>
  );
};

export default App;
