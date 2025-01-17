import React from "react";
import { useRouter } from "next/router";

const useQuery = () => {
  const router = useRouter();
  return router.query;
};

const SmartLink = () => {
  const query = useQuery();
  const utm_content = query.utm_content;
  const baseUrl = "https://signup.snowflake.com/";
  const params = new URLSearchParams({
    utm_source: "streamlit",
    utm_medium: "referral",
    utm_campaign: "na-us-en-",
    utm_content: utm_content || "-ss-streamlit-docs",
  });
  const signupUrlWithUTMs = `${baseUrl}?${params.toString()}`;
  return (
    <div>
      Go to{" "}
      <a href={signupUrlWithUTMs} target="_blank">
        signup.snowflake.com
      </a>
      . (This link will open in a new tab.)
    </div>
  );
};

export default SmartLink;
