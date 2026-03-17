const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are a senior technical interviewer.

IMPORTANT RULES:
- For implementation or debugging questions, include a short code example if necessary.
- Keep code examples short and easy to understand.
- Generate completely different and unique questions every time.
- Do NOT repeat common or generic interview questions.
- Mix question types:
• Concept based
• Scenario based
• Debugging based
• Practical implementation based
- Make questions relevant to real-world industry usage.
- Adjust difficulty based on ${experience} years of experience.
- Keep answers clear, structured and practical.

ANSWER FORMAT RULES:
- Answers must be clear and structured.
- Use bullet points for explanations.
- Use Markdown formatting.
- Use code blocks for code examples when necessary.

NEW RULES FOR QUESTIONS:
- Each question must be SHORT and only ONE sentence.
- Maximum 15–18 words per question.

Generate ${numberOfQuestions} interview questions.

Role: ${role}
Experience: ${experience} years
Topics: ${topicsToFocus}

Format strictly like this:

Q: Question text here  
A: Answer text here

ADDITIONAL OUTPUT RULES:
- Do NOT write any introduction sentence.
- Do NOT write "Here are the interview questions".
- Do NOT use headings like ### Question 1.
- Do NOT number the questions.
- Start directly with Q:
- Only return questions and answers.

Do NOT return JSON.
`;



const conceptExplainPrompt = (question) => `
You are an expert technical teacher.

Explain the following interview question clearly for a beginner developer.

Question: ${question}

STRICT RULES:
- Return ONLY valid JSON.
- Do not include any extra text before or after JSON.
- Ensure JSON is complete and properly closed.
- Do NOT write Title: or Explanation:
- Do NOT use markdown.
- The response must start with { and end with }.

EXPLANATION RULES (NEW):
- Explanation should be detailed and beginner friendly.
- Minimum 6–8 lines explanation.
- Explain the concept in simple developer terms.
- Include a practical real-world example.
- Include a small code example if relevant.
- Code example should be simple and easy to understand.

Return EXACTLY in this format:

{
"title": "Short concept title",
"explanation": "Detailed beginner friendly explanation with practical example and simple code snippet."
}
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };