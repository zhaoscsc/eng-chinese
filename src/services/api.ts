import axios from 'axios';

interface ChineseNameResponse {
  name: string;
  pinyin: string;
  meaning: string;
  englishMeaning: string;
  culturalContext: string;
}

const API_KEY = 'ea555af5edf5411e808ec34680a12a08.DMfHklZbNJY1UO9a';
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

const generatePrompt = (englishName: string) => {
  return `请你扮演一个专业的中文姓名翻译和文化顾问。我需要你为英文名"${englishName}"生成一个合适的中文名字。

请按照以下格式返回结果（必须是JSON格式）：
{
  "name": "中文名字",
  "pinyin": "拼音",
  "meaning": "字面含义",
  "englishMeaning": "英文解释",
  "culturalContext": "文化内涵"
}

要求：
1. 名字要发音优美，寓意吉祥
2. 要考虑中国传统文化内涵
3. 音译要接近原英文名
4. 字义要积极向上`
};

export const generateChineseName = async (englishName: string): Promise<ChineseNameResponse> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "glm-4-flash",
        messages: [
          {
            role: "user",
            content: generatePrompt(englishName)
          }
        ],
        temperature: 0.7,
        top_p: 0.8,
        max_tokens: 800
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating Chinese name:', error);
    throw new Error('Failed to generate Chinese name');
  }
};