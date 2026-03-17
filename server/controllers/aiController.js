const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompt")
const Groq = require("groq-sdk") 
require("dotenv").config()

//@desc Generate Interview Questions and Answers using Google Gemini 
//@route POST /api/ai/generate-qestions
//@access Private
// 🔁 CHANGED: Gemini remove, Groq add

// 🔁 CHANGED: Gemini ai instance ki jagah Groq instance
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

exports.generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const prompt = questionAnswerPrompt(
            role,
            experience,
            topicsToFocus,
            numberOfQuestions
        )

        // 🔁 CHANGED: Gemini generateContent ➜ Groq chat.completions.create
        const response = await groq.chat.completions.create({
            messages: [
                { role: "user", content: prompt }
            ],
            model: "llama-3.1-8b-instant",   // 🔁 CHANGED: Gemini model ➜ Groq model
            temperature: 0.9          // 🔁 ADDED: variation ke liye
        })

        // 🔁 CHANGED: Gemini response.text ➜ Groq response format
        let rawText = response.choices[0].message.content;

// Split safely using Q: and A:
const blocks = rawText.split("Q:").filter(Boolean);

const data = blocks.map(block => {
  const parts = block.split("A:");

  return {
    question: parts[0]?.trim(),
    answer: parts[1]?.trim()
  };
});

res.status(200).json(data);

    } catch (error) {
        console.error("Groq Error:", error.message) // 🔁 ADDED better debugging
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message
        })
    }
}

//@desc Generate Concept Explanation a interview Questions 
//@route POST /api/ai/generate-explanation
//@access Private
 // ✅ NEW: Groq import kiya

const groqai = new Groq({
  apiKey: process.env.GROQ_API_KEY // ✅ NEW: Gemini ki jagah Groq key
})

exports.generateConceptExpanation = async (req, res) => {
  try {
    const { question } = req.body

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const prompt = conceptExplainPrompt(question)

    // ✅ CHANGED: Gemini ai.models.generateContent hata diya
    // ✅ NEW: Groq chat completion use kiya
    const completion = await groqai.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile" // ✅ Latest working Groq model
    })

    const rawText = completion.choices[0].message.content // ✅ Gemini response.text ki jagah ye use hoga

    // ✅ Safe JSON parse (extra text remove karne ke liye)
   let data

try {
  data = JSON.parse(rawText)
} catch (err) {
  // console.log("Raw AI Output:", rawText)

  // Fallback: Try extracting JSON safely
  const match = rawText.match(/\{[\s\S]*\}/)

  if (!match) {
    throw new Error("No valid JSON found in AI response")
  }

  data = JSON.parse(match[0])
}

    res.status(200).json(data)

  } catch (error) {
    console.error("Groq Error:", error.message)

    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message
    })
  }
}

// module.exports = { generateInterviewQuestions, generateConceptExpanation }