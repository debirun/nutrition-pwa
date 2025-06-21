// このCanvasには src/App.js の内容だけを保持します。その他のファイルは別Canvasで管理します。

// src/App.js
import React, { useState } from 'react';
import './App.css';
import { vitaminReference } from './data/vitamins';
import { mineralReference } from './data/minerals';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import FoodSearch from './components/FoodSearch';
import NutritionGraph from './components/NutritionGraph';

ChartJS.register(BarElement, CategoryScale, LinearScale, annotationPlugin);

const aminoAcidNames = {
  histidine: 'ヒスチジン', isoleucine: 'イソロイシン', leucine: 'ロイシン', lysine: 'リシン',
  methionine: 'メチオニン', phenylalanine: 'フェニルアラニン', threonine: 'トレオニン',
  tryptophan: 'トリプトファン', valine: 'バリン'
};

const vitaminUnit = { A: 'μg', D: 'μg', E: 'mg', K: 'μg', B1: 'mg', B2: 'mg', C: 'mg', B3: 'mg', B6: 'mg', B12: 'μg', B9: 'μg', B5: 'mg', H: 'μg' };
const mineralUnit = { Ca: 'mg', Mg: 'mg', Fe: 'mg', Zn: 'mg', Cu: 'mg', Mn: 'mg', I: 'μg', Se: 'μg', K: 'mg', P: 'mg', Cr: 'μg', Mo: 'μg' };

const aminoAcidReference = [
  { ageMin: 0, ageMax: 0.6, data: { histidine: 22, isoleucine: 36, leucine: 73, lysine: 63, methionine: 31, phenylalanine: 59, threonine: 35, tryptophan: 9.5, valine: 48 } },
  { ageMin: 1, ageMax: 2, data: { histidine: 15, isoleucine: 27, leucine: 54, lysine: 44, methionine: 22, phenylalanine: 40, threonine: 24, tryptophan: 6.4, valine: 36 } },
  { ageMin: 3, ageMax: 10, data: { histidine: 12, isoleucine: 22, leucine: 44, lysine: 35, methionine: 17, phenylalanine: 30, threonine: 18, tryptophan: 4.8, valine: 29 } },
  { ageMin: 11, ageMax: 14, data: { histidine: 12, isoleucine: 22, leucine: 44, lysine: 35, methionine: 17, phenylalanine: 30, threonine: 18, tryptophan: 4.8, valine: 29 } },
  { ageMin: 15, ageMax: 17, data: { histidine: 11, isoleucine: 21, leucine: 42, lysine: 33, methionine: 16, phenylalanine: 28, threonine: 17, tryptophan: 4.5, valine: 28 } },
  { ageMin: 18, ageMax: 120, data: { histidine: 10, isoleucine: 20, leucine: 39, lysine: 30, methionine: 15, phenylalanine: 25, threonine: 15, tryptophan: 4.0, valine: 26 } },
];

function App() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [results, setResults] = useState(null);
  const [intake, setIntake] = useState({ protein: 0, fat: 0, carbs: 0 });


  const calculateNutrition = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    const bmr = gender === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const dailyCalories = bmr * 1.5;
    const weeklyCalories = dailyCalories * 7;

    const proteinDay = w * 1.2;
    const proteinWeek = proteinDay * 7;
    const fatDay = (dailyCalories * 0.25) / 9;
    const fatWeek = fatDay * 7;
    const carbsDay = (dailyCalories * 0.5) / 4;
    const carbsWeek = carbsDay * 7;

    setResults({ proteinDay, proteinWeek, fatDay, fatWeek, carbsDay, carbsWeek });
  };

  const handleAddFoods = (foods) => {
    const total = foods.reduce(
      (acc, item) => ({
        protein: acc.protein + (item.protein || 0),
        fat: acc.fat + (item.fat || 0),
        carbs: acc.carbs + (item.carbs || 0),
      }),
      { protein: 0, fat: 0, carbs: 0 }
    );
    setIntake(prev => ({
      protein: prev.protein + total.protein,
      fat: prev.fat + total.fat,
      carbs: prev.carbs + total.carbs,
    }));
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
        <>
          <h2>推定される必要摂取量</h2>
          <ul>
            <li>タンパク質: {results.proteinDay.toFixed(1)} g / 日・{results.proteinWeek.toFixed(1)} g / 週</li>
            <li>脂質: {results.fatDay.toFixed(1)} g / 日・{results.fatWeek.toFixed(1)} g / 週</li>
            <li>炭水化物: {results.carbsDay.toFixed(1)} g / 日・{results.carbsWeek.toFixed(1)} g / 週</li>
          </ul>

          <NutritionGraph results={results} intake={intake} />
          <FoodSearch
            foodData={[
              { name: '鶏むね肉', protein: 23, fat: 1.9, carbs: 0 },
              { name: '白米', protein: 2.5, fat: 0.3, carbs: 37.1 }
            ]}
            onAddFoods={handleAddFoods}
          />


        </>
      )}
    </div>
  );
}

export default App;
