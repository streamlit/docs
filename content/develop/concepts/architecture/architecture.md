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

## WebSockets

For most app developers, it's not necessary to understand WebSockets. However, if you work with large-scale deployments, create especially complex custom components, or need to manually manipulate your app connections, this section might be relevant to you.

Streamlit's server is built on top of the Tornado web framework, which communicates over WebSockets. WebSockets establish a persistent, bidirectional communication channel between the browser frontend and the server. This persistent connection allows the server to efficiently push updates to the client in real time and maintain context about each user's session. When a new connection is made with the server, it establishes a new WebSocket connection and therefore a new session within your app. This is why a user will have two independent sessions if they open two tabs to the same app in a single browser.

### Load balancing and replication for large-scale deployments

For large-scale deployments, apps might be deployed with load balancing or replication. In this scenario, WebSockets can create unintended consequences for any Streamlit command that displays an image, audio, or video file, and any command that allows the user to upload a file. To avoid errors, you must enable session affinity or stickiness with your replication. To configure session stickiness, refer to your deployment platform's documentation. For further discussion and tips, see GitHub issue [#4173](https://github.com/streamlit/streamlit/issues/4173).

When a client sends an HTTP request to your server for a media file, there is no session context. If you have server replication without stickiness, this HTTP request can be routed to a different server than one used in the session's WebSocket connection. If a media file does not exist with a stable ID on all server replicates, you will receive a the following error: `MediaFileStorageError: Bad filename`. This error is raised even you pass a media file as bytes because Streamlit creates a temporary file from the bytes to serve to your user's browser.
