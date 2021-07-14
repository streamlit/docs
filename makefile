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

.PHONY: docstrings
docstrings:
	cd python && docker build -t streamlit-docstring-generator .

.PHONY: run_docstrings
run_docstrings:
	docker-compose -f python/compose.yml -p streamlit-docs up