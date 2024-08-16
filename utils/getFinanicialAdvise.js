import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} USD 
      - Expenses: ${totalSpend} USD 
      - Incomes: ${totalIncome} USD
      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
    `;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: " Based on the following financial data:\n      - Total Budget: 1000000 USD \n      - Expenses: 10000 USD \n      - Incomes: 1000000 USD\n      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively in JSON format.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '```json\n{\n  "financial_advice": [\n    "You have a balanced budget with equal income and expenses, but consider allocating a portion of your income towards savings and investments to secure your financial future.",\n    "While your current financial situation appears healthy, it\'s crucial to track and manage your expenses to ensure they remain within your budget and avoid potential financial instability."\n  ]\n}\n```',
            },
          ],
        },
      ],
    });
    const result = await chatSession.sendMessage(userPrompt);
    return result;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
