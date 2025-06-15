// このファイルは食材検索と選択機能を担当するコンポーネントになります
// src/components/FoodSearch.js

import React, { useState, useEffect } from 'react';

function FoodSearch({ foodData, onAddFoods }) {
  const [selectedFood, setSelectedFood] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    if (foodData.length > 0) {
      setSelectedFood(foodData[0].name);
    }
  }, [foodData]);

  const handleAdd = () => {
    const food = foodData.find(item => item.name === selectedFood);
    if (food) {
      setFoodList(prev => [...prev, food]);
    }
  };

  const handleSubmit = () => {
    if (foodList.length > 0) {
      onAddFoods(foodList);
      setFoodList([]);
    }
  };

  return (
    <div>
      <h3>食品検索と追加</h3>
      <select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)}>
        {foodData.map((item, index) => (
          <option key={index} value={item.name}>{item.name}</option>
        ))}
      </select>
      <button onClick={handleAdd}>追加候補に入れる</button>

      {foodList.length > 0 && (
        <div>
          <h4>追加候補:</h4>
          <ul>
            {foodList.map((food, index) => (
              <li key={index}>{food.name}</li>
            ))}
          </ul>
          <button onClick={handleSubmit}>追加</button>
        </div>
      )}
    </div>
  );
}

export default FoodSearch;
