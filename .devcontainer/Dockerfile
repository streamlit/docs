# See here for image contents: https://github.com/devcontainers/images/tree/main/src/python

# [Choice] Python version: 3.10-bookworm, 3.11-bookworm, 3.12-bookworm, 3.13-bookworm
ARG VARIANT="3.13-bookworm"
FROM mcr.microsoft.com/devcontainers/python:1-${VARIANT}

# [Choice] Node.js version: none, 20, 22, lts/*
ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

ENV PATH="/home/vscode/.local/bin:${PATH}"

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1
