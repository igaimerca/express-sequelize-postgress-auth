# Express/Sequelize/Postgresql backend
Express/Sequelize/Postgresql authentication app
<br>

# Setups and Tools
- Postgresql
- Node
- API testing env tool (Postman recommended)
- Code editor (Vs code recommended)

# Quickly getting started
- Clone the repository `https://github.com/igaimerca/express-sequelize-postgress-auth.git`

- Run `npm install` to install packages

- Create `.env` file, fill it with scripts in `.env.example` with actual values where not specified

- Create Database `sequelize db:create`

- Create necessary tables i.e <code>user</code> do `sequelize db:migrate` 

# Working endpoints

- GET all users `/users`
- Register a new user, POST `/register`
 
```
{
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "123456",
    "age": 18,
    "address": "USA"
}
```
- Login, POST  `/login`
```
{
    "email": "john@gmail.com",
    "password": "123456",
}
```

# Authors 
- [Aime Igirimpuhwe](http://twittter.com/aimeigirimpuhwe)

Thank you!