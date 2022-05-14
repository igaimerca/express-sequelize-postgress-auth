const express = require("express");
const { sequelize, User } = require("./models");
const { genSalt, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const bcrypt = require("bcrypt")
const { compare } = bcrypt;


const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
    const { name, email, password, address, age } = req.body;
    try {
        const newUser = await User.create({ name, email, password, address, age });

        // Generate password hash
        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);
        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(403).send("Invalid Email or Password!");

        const validPassword = await compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid Email or Password!");

        const token = sign(
            { uuid: user.uuid },
            "sequelize_jwt_123"
        );

        res.header("Authorization", token).send({
            status: 200,
            message: "Login Successful",
            token: 'Bearer ' + token
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Invalid login credentials" })
    }

})


app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

app.put("/users/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    const { name, email, password, address, age } = req.body;
    try {
        if (password) {
            return res.status(403).json({ message: "Password needs to be changed separately" })
        }
        if (email) {
            return res.status(403).json({ message: "You cannot change your email" })
        }


        const user = await User.findOne({ where: { uuid } })
        user.name = name;
        user.address = address;
        user.age = age;

        await user.save();

        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

app.listen({ port: 5000 }, async () => {
    console.log("Server up on port 5000");
    await sequelize.authenticate();
    console.log("Database connected");
})

