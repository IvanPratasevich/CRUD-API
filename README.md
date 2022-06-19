# CRUD-API
 ## [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
## Instruction:
1. Clone repo:
 ``` powershell 
git@github.com:IvanPratasevich/CRUD-API.git -b dev 
```
2. To install all dependencies use npm install in the root folder (CRUD-API)
``` powershell 
npm install
```
3) Run ```npm run start:dev``` to start application in development mode or ```npm run start:prod``` to start application in production mode.
To use horizontal scaling for application run ```npm run start:multi```.

## Endpoints
- GET api/users is used to get all persons  
- GET api/users/${userId} is used to get user by userId
- PUT api/users/{userId} is used to update existing user
- DELETE api/users/${userId} is used to delete existing user from database
