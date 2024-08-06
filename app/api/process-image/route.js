// app/api/process-image/route.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request) {
  try {
    // Parse the JSON body
    const { image } = await request.json();
    console.log('Received image for processing:', image);

    // Call OpenAI API to process the image
    const response = await openai.createImage({
      prompt: image, // Adjust this based on the actual API requirements
      n: 1,
      size: '1024x1024'
    });

    const { data } = response;
    console.log('Processed data from OpenAI:', data);

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error('Error processing image:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
