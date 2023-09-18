svc-name=api
svc-version=1
docker-container-name=$(svc-name)-$(svc-version)
PORT=8080

deploy:

run: build
	docker run -i -p $(PORT):$(PORT) \
		-e PORT=$(PORT) \
		-it $(docker-container-name)

build: clean
	docker build -t $(docker-container-name) .

install: clean
	npm install

clean:
	rm -rf node_modules/ package-lock.json dist/