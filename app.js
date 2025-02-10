const express = require("express");
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml');
const app = express();

//utils
const notFoundRoute = require("./utils/notFoundRoute");
const authCheck = require("./middlewares/authCheck");

//Routes import
const TaskRoutes = require("./routes/Task");
const UserRoutes = require("./routes/User");
const AuthRoutes = require("./routes/Auth");
const JobRoutes = require("./routes/Job");
const ProductRoutes = require("./routes/Product");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
}))
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(hpp());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//serve the public files
app.use(express.static("./public"));

//routes configure
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/jobs",authCheck,JobRoutes);
app.use("/api/v1/products",authCheck,ProductRoutes);
app.use("/api/v1/tasks", authCheck, TaskRoutes);
app.use("/api/v1/users", authCheck, UserRoutes);

//if any route not match
app.use(notFoundRoute);

module.exports = app;
