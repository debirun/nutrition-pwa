// nutrition-pwa/src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState(null);

  const calculateNutrition = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;

    // 基礎代謝（ざっくり）
    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * 25 + 5  // 男性, 25歳想定
      : 10 * w + 6.25 * h - 5 * 25 - 161; // 女性

    const dailyCalories = bmr * 1.5; // 軽い活動レベル
    const weeklyCalories = dailyCalories * 7;

    // 栄養素の目安（ざっくり）
    const protein = w * 1.2 * 7;
    const fat = (weeklyCalories * 0.25) / 9;
    const carbs = (weeklyCalories * 0.5) / 4;
    const vitamins = 'バランス良く摂取';
    const minerals = '必要量を満たすよう調整';

    setResults({ protein, fat, carbs, vitamins, minerals });
  };

  return (
    <div className="App">
      <h1>1週間の栄養素計算</h1>
      <div>
        <label>性別：</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
      </div>
      <div>
        <label>体重（kg）：</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div>
        <label>身長（cm）：</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <button onClick={calculateNutrition}>計算する</button>

      {results && (
        <div className="results">
          <h2>推定される1週間の必要栄養素</h2>
          <ul>
            <li>タンパク質: {results.protein.toFixed(1)} g</li>
            <li>脂質: {results.fat.toFixed(1)} g</li>
            <li>炭水化物: {results.carbs.toFixed(1)} g</li>
            <li>ビタミン: {results.vitamins}</li>
            <li>ミネラル: {results.minerals}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
