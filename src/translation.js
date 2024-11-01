import axios from 'axios';
async function translateText(text) {
  const apiKey = process.env.DEEPL_API_KEY; 
  const url = 'https://api-free.deepl.com/v2/translate';

  try {
    const response = await axios.post(url, null, {
      params: {
        auth_key: apiKey,
        text: text,
        target_lang: 'ZH' 
      },
    });
    return response.data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; 
  }
}
