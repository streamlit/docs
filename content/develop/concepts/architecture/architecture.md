---
title: Understanding Streamlit's client-server architecture
slug: /develop/concepts/architecture/architecture
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

When a client requests media (such as an image or audio file) via HTTP, there is no session context attached to that request. In deployments with multiple server replicas or load balancers, this can cause issues; the HTTP request for the media file might be routed to a different server than the one handling the user’s WebSocket session. If the media file isn’t available on all replicas, you may encounter errors like `MediaFileStorageError: Bad filename`. This can occur even if you pass media as bytes, since Streamlit creates a temporary file on the server to serve to the browser. Any command that allows the user to upload files may also be impacted.

### Load balancing and session affinity

In large-scale or production deployments, load balancing and server replication are common. However, WebSockets require special consideration in these environments. To ensure that all requests from a user’s session are handled by the same server instance, you must enable session affinity (also known as stickiness) in your load balancer or deployment platform. This prevents errors related to missing session context or unavailable media files. For configuration details, consult your deployment platform’s documentation. For more information, see GitHub issue [#4173](https://github.com/streamlit/streamlit/issues/4173).
