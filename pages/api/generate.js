import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { brand, style } = req.body;

  try {
    const response = await openai.createImage({
      prompt: `A logo for a brand named "${brand}" in ${style} style, 2D vector, centered`,
      n: 1,
      size: '512x512',
    });
    res.status(200).json({ url: response.data.data[0].url });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI error' });
  }
}
