#### Started building the app first 
1. Deploy the app in a container in any public cloud using the services you think best solve this problem.
   - Use `node` as the base image. Version `node:10` or later should work.
1. Could not launch the container due to errors below
```Error: Cannot find module 'express'
Require stack:
- /Users/user1/Documents/GitHub/quest/src/000.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1248:15)
    at Module._load (node:internal/modules/cjs/loader:1074:27)
    at TracingChannel.traceSync (node:diagnostics_channel:315:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:217:24)
    at Module.require (node:internal/modules/cjs/loader:1339:12)
    at require (node:internal/modules/helpers:135:16)
    at Object.<anonymous> (/Users/user1/Documents/GitHub/quest/src/000.js:1:17)
    at Module._compile (node:internal/modules/cjs/loader:1546:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1691:10)
    at Module.load (node:internal/modules/cjs/loader:1317:32) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ '/Users/user1/Documents/GitHub/quest/src/000.js' ] 
  ```

1. Fixed the above code in js file
```
Created below Dockerfile to test the container changes
# Use Node.js version 10 or later
FROM node:10

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
```

1. By running the below commands, able to successfully bring up the container but thats not the final reach as I got the message on the ui attached with screenshot
```
docker build -t my-node-app .
docker run -p 3000:3000 my-node-app

> quest@1.0.0 start /usr/src/app
> node src/000.js

Server listening on port 3000!
```
<img width="440" alt="image" src="https://github.com/user-attachments/assets/93fa3610-ec54-4f0c-83ad-f451c192cf92">
