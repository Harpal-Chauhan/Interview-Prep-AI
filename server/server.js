require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const questionRouters = require("./routes/questionRoutes")
const { protect } = require("./middleware/authMiddleware")
const { generateInterviewQuestions, generateConceptExpanation } = require("./controllers/aiController")

const app = express()

//Middelware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

connectDB()

//Middelware 
app.use(express.json())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/questions", questionRouters)

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect, generateConceptExpanation)

//Serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}))

//Start Server
const PORT = process.env.PORT || 4040
app.listen(PORT, () => console.log(`Server Running to port`))