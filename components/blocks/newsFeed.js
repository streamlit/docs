import React, { useEffect, useState } from "react";
import GhostContentAPI from "@tryghost/content-api";
import NewsEntry from "./newsEntry";

const api = new GhostContentAPI({
  url: "https://streamlit.ghost.io",
  key: "b48c60c1a281bf21dc9afa9950",
  version: "v5.0",
});

function NewsFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch 3 posts, including related tags and authors
    api.posts
      .browse({ limit: 3, include: "tags,authors" })
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div id="result">
        {posts.map((post) => (
          <NewsEntry
            key={post.id}
            date={post.published_at}
            title={post.title}
            text={post.excerpt}
            link={post.url}
            image={post.feature_image}
            target="_blank"
          />
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;
