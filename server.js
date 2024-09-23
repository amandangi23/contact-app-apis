const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");


const app = express();
connectDb();
app.use(express.json());
const port = process.env.port || 5000;

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
