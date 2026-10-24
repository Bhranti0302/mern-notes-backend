const OpenAI = require("openai");
const asyncHandler = require("../utils/asyncHandler");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI suggestions for a new note
const suggestNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const response = await openai.responses.create({
    model: "gpt-5.5",
    instructions: `You are an assistant for a notes app.
      Suggest a category from: Remember, Learning, Food Recipe,
      Work, Ideas, Personal, Other.
      Suggest 3 to 5 short relevant tags.
      Suggest a clearer version of the note content.
      Return valid JSON with keys: category, tags, improvedContent.
      Do not invent facts not present in the note.`,
    input: `Title: ${title}\nContent: ${content}`,
  });

  let suggestions;

  try {
    suggestions = JSON.parse(response.output_text);
  } catch {
    return res.status(502).json({
      success: false,
      message: "AI returned an invalid response. Please try again.",
    });
  }

  return res.status(200).json({
    success: true,
    suggestions,
  });
});

module.exports = { suggestNote };
