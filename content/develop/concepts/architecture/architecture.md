---
title: Understanding Streamlit's client-server architecture
slug: /develop/concepts/architecture/architecture
description: Learn about Streamlit's client-server architecture, WebSocket connections, session management, and deployment considerations.
keywords: architecture, client-server, websocket, session, deployment, server, client
---

# Understanding Streamlit's client-server architecture

Streamlit apps have a client-server structure. The Python backend of your app is the server. The frontend you view through a browser is the client. When you develop an app locally, your computer runs both the server and the client. If someone views your app across a local or global network, the server and client run on different machines. If you intend to share or deploy your app, it's important to understand this client-server structure to avoid common pitfalls.

## Python backend (server)

When you execute the command `streamlit run your_app.py`, your computer uses Python to start up a Streamlit server. This server is the brains of your app and performs the computations for all users who view your app. Whether users view your app across a local network or the internet, the Streamlit server runs on the one machine where the app was initialized with `streamlit run`. The machine running your Streamlit server is also called a host.

## Browser frontend (client)

When someone views your app through a browser, their device is a Streamlit client. When you view your app from the same computer where you are running or developing your app, then server and client are coincidentally running on the same machine. However, when users view your app across a local network or the internet, the client runs on a different machine from the server.

## Server-client impact on app design

Keep in mind the following considerations when building your Streamlit app:

- The computer running or hosting your Streamlit app is responsible for providing the compute and storage necessary to run your app for all users and must be sized appropriately to handle concurrent users.
- Your app will not have access to a user's files, directories, or OS. Your app can only work with specific files a user has uploaded to your app through a widget like `st.file_uploader`.
- If your app communicates with any peripheral devices (like cameras), you must use Streamlit commands or custom components that will access those devices _through the user's browser_ and correctly communicate between the client (frontend) and server (backend).
- If your app opens or uses any program or process outside of Python, they will run on the server. For example, you may want to use `webrowser` to open a browser for the user, but this will not work as expected when viewing your app over a network; it will open a browser on the Streamlit server, unseen by the user.
- If you use load balancing or replication in your deployment, some Streamlit features won't work without session affinity or stickiness. For more information, continue reading.

## WebSockets and session management

While most Streamlit app developers don’t need to interact directly with WebSockets, understanding their role is important for advanced deployments, custom components, or managing connections at scale.

Streamlit’s server is built on the Tornado web framework, which uses WebSockets to maintain a persistent, two-way communication channel between the client and server. This persistent connection allows the server to push real-time updates to the client and maintain session context for each user. Each browser tab or window creates its own WebSocket connection, resulting in a separate session within your app.

In large-scale or production deployments, load balancing and server replication are common. However, the way Streamlit handles sessions and local (server) files requires special consideration in these environments. When a client requests media (such as an image or audio file) via HTTP, there is no session context attached to that request. In deployments with multiple server replicas or load balancers, the HTTP request for the media file might be routed to a different server than the one handling the user’s WebSocket connection and session information. If the media file isn’t available on all replicas, you may encounter errors like `MediaFileStorageError: Bad filename`. Any command that allows the user to upload files can also be impacted and may raise HTTP status code 400.

### Session affinity or stickiness

In general, you can do one of the following to resolve or reduce this limitation:

- Enable session affinity (also known as stickiness) in your proxy. This ensures that all requests from a user’s session are handled by the same server instance.
- Convert media to a Base64 encoded data URI before passing it to a Streamlit command. This passes the media data through the WebSocket instead of using Streamlit's media storage which is accessed through HTTP requests.
- Save dynamically generated files to a stable location outside of your server replicas (e.g. S3 storage), and pass the external URLs to Streamlit commands. This avoids Streamlit's media storage.

Enabling session affinity is a general solution which resolves the limitation for both media files and uploaded files. For configuration details, consult your deployment platform’s documentation.

Using Base64 encoded data URIs or external file storage can straightforwardly resolve the limitation for media files, but are not complete solutions to resolve the limitation for file uploads. For more information, see GitHub issue [#4173](https://github.com/streamlit/streamlit/issues/4173).
