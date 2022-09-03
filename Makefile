.PHONY : all run clean
node_modules package-lock.json :
	npm install
all : node_modules package-lock.json
run : server.js node_modules
	npm start
clean : 
	rm -rf node_modules package-lock.json

