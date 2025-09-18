---
title: Streamlit in Snowflake
slug: /deploy/snowflake
description: Deploy Streamlit apps in Snowflake for enterprise-grade security and data integration with native apps and container services.
keywords: snowflake, enterprise, security, data, native apps, container services, deployment
---

# Deploy Streamlit apps in Snowflake

Host your apps alongside your data in a single, global platform. Snowflake provides industry-leading features that ensure the highest levels of security for your account, users, data, and apps. If you're looking for an enterprise hosting solution, try Snowflake!

<TileContainer>
    <Tile
        icon="rocket_launch"
        title="Streamlit in Snowflake Quickstart"
        text="Create a free trial account and deploy an app with Streamlit in Snowflake."
        link="/get-started/installation/streamlit-in-snowflake"
        background="lightBlue-70"
    />
    <Tile
        icon="code"
        title="Examples"
        text="Explore a wide variety of example apps in Snowflake Labs' snowflake-demo-streamlit repository."
        link="https://github.com/Snowflake-Labs/snowflake-demo-streamlit"
        background="lightBlue-70"
    />
    <Tile
        icon="book"
        title="Get started with Snowflake"
        text="Learn more in Snowflake's documentation."
        link="https://docs.snowflake.com/user-guide-getting-started"
        background="lightBlue-70"
    />
</TileContainer>

There are three ways to host Streamlit apps in Snowflake:

<InlineCalloutContainer>
    <InlineCallout
        color="lightBlue-70"
        icon="bolt"
        bold="Streamlit in Snowflake."
        href="https://docs.snowflake.com/developer-guide/streamlit/about-streamlit"
    >Run your Streamlit app as a native object in Snowflake. Enjoy an in-browser editor and minimal work to configure your environment. Share your app with other users in your Snowflake account through role-based access control (RBAC). This is a great way to deploy apps internally for your business. Check out Snowflake docs!</InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="ac_unit"
        bold="Snowflake Native Apps."
        href="https://docs.snowflake.com/en/developer-guide/native-apps/adding-streamlit"
    >Package your app with data and share it with other Snowflake accounts. This is a great way to share apps and their underlying data with other organizations who use Snowflake. Check out Snowflake docs!</InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="web_asset"
        bold="Snowpark Container Services."
        href="https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview"
    >Deploy your app in a container that's optimized to run in Snowflake. This is the most flexible option, where you can use any library and assign a public URL to your app. Manage your allowed viewers through your Snowflake account. Check out Snowflake docs!</InlineCallout>
</InlineCalloutContainer>

<Note>

    Using Snowpark Container Services to deploy a Streamlit app requires a compute pool, which is not available in a trial account at this time.

</Note>
