import { useState } from 'react'
import './App.css'
import { generateChineseName } from './services/api'

function App() {
  const [englishName, setEnglishName] = useState('')
  const [chineseNames, setChineseNames] = useState<Array<{
    name: string
    pinyin: string
    meaning: string
    englishMeaning: string
    culturalContext: string
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!englishName.trim()) {
      setError('请输入英文名');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await generateChineseName(englishName);
      setChineseNames([result]);
    } catch (err) {
      setError('生成名字时出错，请稍后重试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>English to Chinese Name Generator</h1>
      <div className="input-section">
        <input
          type="text"
          value={englishName}
          onChange={(e) => setEnglishName(e.target.value)}
          placeholder="Enter your English name"
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? '生成中...' : 'Generate Chinese Names'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="results-section">
        {chineseNames.map((result, index) => (
          <div key={index} className="name-card">
            <h2>{result.name} ({result.pinyin})</h2>
            <div className="name-details">
              <p><strong>Meaning:</strong> {result.meaning}</p>
              <p><strong>English Interpretation:</strong> {result.englishMeaning}</p>
              <p><strong>Cultural Context:</strong> {result.culturalContext}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
