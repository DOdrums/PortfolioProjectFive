import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

const Data = () => {
  const [posts, setPosts] = useState({ results: [] });
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/`);
        setPosts(data);
      } catch (err) {}
    };
    fetchPosts();
  }, []);

  return <div></div>;
};

export default Data;
