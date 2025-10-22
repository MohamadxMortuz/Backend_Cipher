require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Removed body-parser as express.json() is preferred
const projects = require("./routes/projects");
const auth = require("./routes/auth");

const app = express();

// Configure CORS properly
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));

const MONGO = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cipherstudio";
mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true }).then(()=>console.log("mongo ok")).catch(e=>console.error("mongo error:", e.message));

app.use("/api/projects", projects);
app.use("/api/auth", auth);

const PORT = parseInt(process.env.PORT, 10) || 4000;
const http = require('http');

const server = http.createServer(app);

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

server.on('error', (err) => {
	if (err.code === 'EADDRINUSE') {
		console.error(`Port ${PORT} is already in use. Try setting a different PORT in your .env file or terminate the process using the port.`);
		console.error('On Windows you can run: netstat -ano | findstr :'+PORT);
		console.error('Then kill the process with: taskkill /PID <pid> /F');
		process.exit(1);
	} else {
		console.error('Server error:', err);
		process.exit(1);
	}
});