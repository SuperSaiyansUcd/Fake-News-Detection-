
### `How to run the app`
-   run `npm ci` to download all node modules
-   now run `npm start`
-   the frontend should now run on port 4200 local host
-   if that fails run `npm i` and then `npm start` 
-   to create a production build run `npm run start`

### `npm test`

This runs the jest tests for our appluication. Each time a commit is made on a branch, the ci/cd pipeline runs all tests and linting rules.

### Deployment
http://fakenewsdetect.westeurope.cloudapp.azure.com:3000/ (Will not be available when the Microsoft VM licence expires, which is around mid August)

### `npm run build`

This is used to create a prouction build, it was used to create our google chrome store web extension found here. https://chrome.google.com/webstore/detail/to-fake-news-detection/idplbimofaidbkabdmepgmhldmjepajj?hl=en-GB

Note the server for this extension will be down Mid-August as the VM is pricey to run