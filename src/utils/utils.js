import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (posts, setPosts, songs, setSongs) => {
  try {
    const { data } = await axiosReq.get(posts.next);
    setPosts((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
  try {
    const { data } = await axiosReq.get(songs.next);
    setSongs((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};
