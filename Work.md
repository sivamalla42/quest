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

2. Fixed the above code in js file, refer to the js file
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

3. By running the below commands, able to successfully bring up the container but thats not the final reach as I got the message on the ui attached with screenshot
```
docker build -t my-node-app .
docker run -p 3000:3000 my-node-app

> quest@1.0.0 start /usr/src/app
> node src/000.js

Server listening on port 3000!
```
<img width="440" alt="image" src="https://github.com/user-attachments/assets/93fa3610-ec54-4f0c-83ad-f451c192cf92">


4. Able to get the url for the secret_word
<img width="1354" alt="image" src="https://github.com/user-attachments/assets/2a48f908-24c6-4bbd-838d-7d5d3065b252">

5. Created a new ecr repo to upload the local images.
6. Used "docker build -t my-linux-binary-test ." to build the docker image
7. docker push to the ecr repo
8. Created an ec2 instance manually, installed docker, had issues with iam role when accessing the ecr. Made require changes and pulled the changes on to this instance
9. Started the docker container with porting on 8080.
10. Tested it locally on the machine with curl http://localhost:8080. Gave Success
11. Created a new application Loadbalancer and created a target group adding this ec2 instance as target. By default it was set to 80.
12. Few issues observered here
   - Application was slow, it was taking close to 20seconds to respond. Due to which the health check was failing on LB
   - As the app was exposed on 8080, had to re-register the target group to 8080
   - Also had to increase the timeout threshold to 20seconds to get a healthy status to match the slowness of the app
13. Created a R53 A record and pointed to this ALB to access the application over the internet within the infra.
14. Fixed all the issues, able to access the application
<img width="965" alt="image" src="https://github.com/user-attachments/assets/c599d98c-9cb9-441c-a808-792c3801660f">
