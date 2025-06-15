// src/App.js
import React, { useState } from 'react';
import './App.css';

const aminoAcidNames = {
  histidine: 'ヒスチジン',
  isoleucine: 'イソロイシン',
  leucine: 'ロイシン',
  lysine: 'リシン',
  methionine: 'メチオニン',
  phenylalanine: 'フェニルアラニン',
  threonine: 'トレオニン',
  tryptophan: 'トリプトファン',
  valine: 'バリン'
};

const aminoAcidReference = [
  { ageMin: 0, ageMax: 0.6, data: { histidine: 22, isoleucine: 36, leucine: 73, lysine: 63, methionine: 31, phenylalanine: 59, threonine: 35, tryptophan: 9.5, valine: 48 } },
  { ageMin: 1, ageMax: 2, data: { histidine: 15, isoleucine: 27, leucine: 54, lysine: 44, methionine: 22, phenylalanine: 40, threonine: 24, tryptophan: 6.4, valine: 36 } },
  { ageMin: 3, ageMax: 10, data: { histidine: 12, isoleucine: 22, leucine: 44, lysine: 35, methionine: 17, phenylalanine: 30, threonine: 18, tryptophan: 4.8, valine: 29 } },
  { ageMin: 11, ageMax: 14, data: { histidine: 12, isoleucine: 22, leucine: 44, lysine: 35, methionine: 17, phenylalanine: 30, threonine: 18, tryptophan: 4.8, valine: 29 } },
  { ageMin: 15, ageMax: 17, data: { histidine: 11, isoleucine: 21, leucine: 42, lysine: 33, methionine: 16, phenylalanine: 28, threonine: 17, tryptophan: 4.5, valine: 28 } },
  { ageMin: 18, ageMax: 120, data: { histidine: 10, isoleucine: 20, leucine: 39, lysine: 30, methionine: 15, phenylalanine: 25, threonine: 15, tryptophan: 4.0, valine: 26 } },
];

const vitaminReference = [
  { ageMin: 1, ageMax: 2, male: { A: 400, D: 3, E: 3, K: 50, B1: 0.5, B2: 0.6, C: 40 }, female: { A: 350, D: 3.5, E: 3, K: 60, B1: 0.5, B2: 0.5, C: 40 } },
  { ageMin: 3, ageMax: 5, male: { A: 450, D: 3.5, E: 4, K: 60, B1: 0.7, B2: 0.8, C: 50 }, female: { A: 400, D: 4, E: 4, K: 70, B1: 0.7, B2: 0.8, C: 50 } },
  { ageMin: 6, ageMax: 7, male: { A: 600, D: 4.5, E: 5, K: 80, B1: 0.8, B2: 0.9, C: 60 }, female: { A: 550, D: 5, E: 5, K: 90, B1: 0.8, B2: 0.9, C: 60 } },
  { ageMin: 8, ageMax: 9, male: { A: 600, D: 5, E: 5, K: 90, B1: 1.0, B2: 1.1, C: 70 }, female: { A: 550, D: 6, E: 5, K: 110, B1: 0.9, B2: 1.0, C: 70 } },
  { ageMin: 10, ageMax: 11, male: { A: 600, D: 6.5, E: 5.5, K: 110, B1: 1.2, B2: 1.4, C: 85 }, female: { A: 550, D: 8, E: 5.5, K: 140, B1: 1.1, B2: 1.3, C: 85 } },
  { ageMin: 12, ageMax: 14, male: { A: 800, D: 8, E: 6.5, K: 140, B1: 1.4, B2: 1.6, C: 100 }, female: { A: 700, D: 9.5, E: 6, K: 170, B1: 1.3, B2: 1.4, C: 100 } },
  { ageMin: 15, ageMax: 17, male: { A: 900, D: 9, E: 7, K: 160, B1: 1.5, B2: 1.7, C: 100 }, female: { A: 650, D: 8.5, E: 5.5, K: 150, B1: 1.2, B2: 1.4, C: 100 } },
  { ageMin: 18, ageMax: 120, male: { A: 900, D: 8.5, E: 6, K: 150, B1: 1.2, B2: 1.6, C: 100 }, female: { A: 700, D: 8.5, E: 5.5, K: 150, B1: 1.1, B2: 1.2, C: 100 } }
];

function App() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [results, setResults] = useState(null);

  const calculateNutrition = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const dailyCalories = bmr * 1.5;
    const weeklyCalories = dailyCalories * 7;

    const proteinDay = w * 1.2;
    const proteinWeek = proteinDay * 7;
    const fatDay = (dailyCalories * 0.25) / 9;
    const fatWeek = fatDay * 7;
    const carbsDay = (dailyCalories * 0.5) / 4;
    const carbsWeek = carbsDay * 7;

    const aminoStandard = aminoAcidReference.find(ref => a >= ref.ageMin && a <= ref.ageMax)?.data || {};
    const aminoAcids = Object.fromEntries(Object.entries(aminoStandard).map(([key, val]) => {
      return [key, { perDay: val * w, perWeek: val * w * 7 }];
    }));

    const vitaminStandard = vitaminReference.find(ref => a >= ref.ageMin && a <= ref.ageMax);
    const vitaminValues = vitaminStandard ? vitaminStandard[gender] : {};
    const vitamins = Object.fromEntries(Object.entries(vitaminValues).map(([key, val]) => {
      return [key, { perDay: val, perWeek: val * 7 }];
    }));

    setResults({ proteinDay, proteinWeek, fatDay, fatWeek, carbsDay, carbsWeek, aminoAcids, vitamins });
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
      <div>
        <label>年齢（歳）：</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <button onClick={calculateNutrition}>計算する</button>

      {results && (
        <div className="results">
          <h2>推定される必要栄養素</h2>
          <ul>
            <li>タンパク質: {results.proteinDay.toFixed(1)} g / 日・{results.proteinWeek.toFixed(1)} g / 週</li>
            <li>脂質: {results.fatDay.toFixed(1)} g / 日・{results.fatWeek.toFixed(1)} g / 週</li>
            <li>炭水化物: {results.carbsDay.toFixed(1)} g / 日・{results.carbsWeek.toFixed(1)} g / 週</li>
          </ul>
          <h3>必須アミノ酸（mg）</h3>
          <ul>
            {Object.entries(results.aminoAcids).map(([name, val]) => (
              <li key={name}>{aminoAcidNames[name] || name}：{val.perDay.toFixed(1)} mg / 日・{val.perWeek.toFixed(1)} mg / 週</li>
            ))}
          </ul>
          <h3>ビタミン必要量</h3>
          <ul>
            {Object.entries(results.vitamins).map(([name, val]) => (
              <li key={name}>ビタミン{name}：{val.perDay}{name === 'A' || name === 'K' || name === 'B12' ? 'μg' : 'mg'} / 日・{val.perWeek}{name === 'A' || name === 'K' || name === 'B12' ? 'μg' : 'mg'} / 週</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
