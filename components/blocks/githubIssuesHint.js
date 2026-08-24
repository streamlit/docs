import React from "react";

import Tip from "./tip";

const GitHubIssuesHint = ({ label, name }) => {
  const displayName = name || String(label).replace(/^feature:/, "");
  const query = `is:issue state:open label:"${label}" sort:reactions-+1-desc`;
  const url = `https://github.com/streamlit/streamlit/issues?q=${encodeURIComponent(query)}`;

  return (
    <Tip>
      <p>
        Want a new <code>{displayName}</code> feature or found a bug? Browse{" "}
        <a href={url}>open issues</a> and react with a 👍 on the initial post of
        the ones that matter to you. Your votes help us prioritize what to work
        on next.
      </p>
    </Tip>
  );
};

export default GitHubIssuesHint;
