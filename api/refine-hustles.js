import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { age, time, interest, zipcode, city, region } = req.body;

  const prompt = `
You are a helpful assistant that generates unique, realistic side hustle ideas for teens.
The user is ${age} years old, has ${time} of free time per week, is interested in ${interest}, and lives in ${city || zipcode}, ${region}.
Suggest 3 specific, creative, and localized side hustles.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85
    });

    const ideas = completion.choices[0].message.content
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, ''));

    res.status(200).json({ ideas });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ ideas: ["⚠️ Something went wrong. Try again later."] });
  }
}

