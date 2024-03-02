import OpenAI from "openai";


const apiKey = process.env.REACT_APP_API_KEY

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });


export async function sendMsgToOpenAI(message) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ],
            model: "gpt-3.5-turbo",
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
