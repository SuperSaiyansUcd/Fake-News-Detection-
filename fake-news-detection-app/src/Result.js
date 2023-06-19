import { useLocation } from 'react-router-dom';
import LineSpectrum from './components/LineSpectrum';

export default function Result() {
    const location = useLocation();
    const { title, content } = location.state;
    const truthfulnessScore = 30; // Value will come from the model
    const truthfulnessScoreValidated = validateTruthScore(truthfulnessScore);

    const conditionMap = [
        { range: [0, 10], text: 'This is very likely fake news' },
        { range: [11, 20], text: 'This is likely fake news' },
        { range: [21, 40], text: 'This could be fake news' },
        { range: [41, 60], text: 'Undetermined whether this is real or fake news' },
        { range: [61, 80], text: 'This could be authentic news' },
        { range: [81, 90], text: 'This is likely authentic news' },
        { range: [91, 100], text: 'This is very likely authentic news' },
      ];
      
      // keep result text a const for security
      const resultText = conditionMap
      .reverse()
      .find(({ range }) => {
        const [min, max] = range;
        return truthfulnessScoreValidated >= min && truthfulnessScoreValidated <= max;
      })?.text || 'Error - Currently unable to judge the articles authenticity';
    
    return (
        <div>
            <h2>{resultText}</h2>
            <LineSpectrum value={truthfulnessScoreValidated} />
            <p>Title: {title}</p>
            <p>Content: {content}</p>
        </div>
        
    );

    function validateTruthScore(truthfulnessScore) {
        if (truthfulnessScore >= 0 && truthfulnessScore <= 100) {
          return truthfulnessScore;
        }
        return -1;
      }
      
}
