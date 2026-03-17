const Question = require("../models/Question")
const Session = require("../models/Session")

//  @desc   Add additional question to an existing session
//  @route  POST /api/questions/add
//  @access Private 
exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body

        if (!sessionId || !questions || !Array.isArray(questions)) { 
            return res.status(400).json({ message: "Session ID and questions array are required" })
        }
        const session = await Session.findById(sessionId)
        if (!session) {
            return res.status(404).json({ message: "Session not found" })
        }

        // Create new Questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question:q.question,
                answer: q.answer,
            }))
        )

        //Update session to include new questions IDs
        session.questions.push(...createdQuestions.map((q) => q._id))
        await session.save()

        res.status(201).json(createdQuestions)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}     

//  @desc   Pin or unpin a question
//  @route  POST /api/questions/:id/pin
//  @access Private 
exports.togglePinQuestion = async (req, res) => {
    try {
        const quetion = await Question.findById(req.params.id)

        if (!quetion) {
            return res.status(404).json({ success: false, message: "Question not found" })
        }
        quetion.isPinned = !quetion.isPinned
        await quetion.save()

        res.status(200).json({ success: true, quetion })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
} 

//  @desc Update a note for a question
//  @route  POST /api/questions/:id/note
//  @access Private 
exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body
        const quetion = await Question.findById(req.params.id)

        if (!quetion) {
            return res.status(404).json({ success: false, message: "Question not found" })
        }

        quetion.note = note || ""
        await quetion.save()

        res.status(200).json({ success: true, quetion })
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
} 