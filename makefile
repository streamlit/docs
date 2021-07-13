dev:
	npm run dev

start:
	npm run start

build:
	npm run build

docstrings:
	cd python && docker build -t streamlit-docstring-generator .

run:
	docker-compose -f python/compose.yml -p streamlit-docs up