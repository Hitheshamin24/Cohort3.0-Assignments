import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;
export const fetchPhotos = async (query, page = 1, per_page = 20) => {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  return res.data;
};

export const fetchVideos = async (query, per_page = 20) => {
  const res = await axios.get("https://api.pexels.com/v1/videos/search", {
    params: { query, per_page },
    headers: { Authorization: `Client-ID ${PEXELS_KEY}` },
  });

  return res.data;
};
export const fetchGIFs = async (q) => {
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { api_key: GIPHY_KEY, q },
  });
  return res.data.data;
};
