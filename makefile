.PHONY: all
all:
	npm i

.PHONY: up
up:
	npm run dev

.PHONY: start
start:
	npm run start

.PHONY: build
build:
	npm run build

.PHONY: export
export:
	npm run export

.PHONY: lint
lint:
	npm run lint

.PHONY: search
search:
	node ./scripts/build-search-index.js

.PHONY: docstrings_image
docstrings_image:
	cd python && docker build -t streamlit-docstring-generator .

.PHONY: docstrings
docstrings: docstrings_image
	docker-compose -f python/compose.yml -p streamlit-docs up