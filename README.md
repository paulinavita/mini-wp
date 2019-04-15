### TYPRO - MiniWP

API Documentation

**URLs**

```Client URL : http://localhost:8080,
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

### List of Articles Routes

| Routes        | HTTP   | Header(s) | Body                                                         | Response Success                          | Response Error        | Description                    |
| ------------- | ------ | --------- | ------------------------------------------------------------ | ----------------------------------------- | --------------------- | ------------------------------ |
| /articles/all | GET    | Token     | None                                                         | `Status code : 200`<br>`dataTypes : []`   | `Status code : 400` ` | Get all articles list by users |
| /articles/:id | GET    | Token     | None                                                         | `Status code : 200`<br/>`dataTypes : {}   | `Status code : 400`   | Get specific articled by id    |
| /articles/    | POST   | Token     | userId:String**(Required)**, title:String**(Required)**, content:String**(Required)**, createdAt: date, image:**String(Required)** | `Status code : 2001`<br/>`dataTypes : {}` | `Status code : 400`   | Create an article by us        |
|               |        |           |                                                              |                                           |                       |                                |
|               |        |           |                                                              |                                           |                       |                                |
| /articles/:id | DELETE | Token     | None                                                         | `Status code : 200`<br/>`dataTypes : {}`  | `Status code : 400`   | Delete an atricle              |
| /articles/:id | PATCH  | Token     | None                                                         | `Status code : 200`<br/>`dataTypes : {}`  | `Status code : 400`   | Edit an article                |

### List of Sign In Routes

| Routes         | HTTP | Header(s) | Body                                                         | Response Success                         | Response Error      | Description            |
| -------------- | ---- | --------- | ------------------------------------------------------------ | ---------------------------------------- | ------------------- | ---------------------- |
| /signin/local  | POST | None      | username:String**(Required)**, <br>password:String**(Required)**,<br>email:String(**Required**) | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` | Sign in through local  |
| /signin/google | POST | None      | password:String**(Required)**,<br/>email:String(**Required**)** | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` | Sign in through google |

### List of User Routes

| Routes              | HTTP | Header(s) | Body                                                         | Response Success                           | Response Error        | Description          |
| ------------------- | ---- | --------- | ------------------------------------------------------------ | ------------------------------------------ | --------------------- | -------------------- |
| /users/             | POST | None      | username:String**(Required)**, password:String**(Required)**, email:String**(Required)**, via:String**(Required)** | `Status code : 200`<br/>`dataTypes : {}`   | `Status code : 400`   | Sign up              |
| /users              | GET  | Token     | None                                                         | `Status code : 200`<br/>`dataTypes : {}`   | `Status code : 400`   | Get all users        |
| /users/location     | GET  | Token     | None                                                         | ``Status code : 200`<br/>`dataTypes : {}`` | `Status code : 400`   | Get user location    |
| /users/randomquotes | GET  | Token     | None                                                         | ``Status code : 200`<br/>`dataTypes : {}`` | ``Status code : 400`` | Get random quotes    |
| /users/:username    | GET  | Token     | None                                                         | ``Status code : 200`<br/>`dataTypes : {}`` | ``Status code : 400`` | Get user by username |



#### Usage

Make sure you have Node.js and npm installed in your computer, and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after a sign in / sign up action on the client-side.

Run `nodemon app.js` to start the server.

