up:
	npm run dev

docstrings:
	cd python && docker build -t streamlit-docstring-generator .

run:
	docker-compose -f python/compose.yml -p streamlit-docs up