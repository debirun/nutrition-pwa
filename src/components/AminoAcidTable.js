// src/components/AminoAcidTable.js
import React from 'react';

const aminoAcidData = [
  { age: "0.5", maintenance: 0.66, growth: 0.46, histidine: 22, isoleucine: 36, leucine: 73, lysine: 63, sulfurAAs: 31, aromaticAAs: 59, threonine: 35, tryptophan: 9.5, valine: 48, total: 376 },
  { age: "1〜2", maintenance: 0.66, growth: 0.20, histidine: 15, isoleucine: 27, leucine: 54, lysine: 44, sulfurAAs: 22, aromaticAAs: 40, threonine: 24, tryptophan: 6.4, valine: 36, total: 267 },
  { age: "3〜10", maintenance: 0.66, growth: 0.07, histidine: 12, isoleucine: 22, leucine: 44, lysine: 35, sulfurAAs: 17, aromaticAAs: 30, threonine: 18, tryptophan: 4.8, valine: 29, total: 212 },
  { age: "11〜14", maintenance: 0.66, growth: 0.07, histidine: 12, isoleucine: 22, leucine: 44, lysine: 35, sulfurAAs: 17, aromaticAAs: 30, threonine: 18, tryptophan: 4.8, valine: 29, total: 212 },
  { age: "15〜17", maintenance: 0.66, growth: 0.04, histidine: 11, isoleucine: 21, leucine: 42, lysine: 33, sulfurAAs: 16, aromaticAAs: 28, threonine: 17, tryptophan: 4.5, valine: 28, total: 200 },
  { age: "18以上", maintenance: 0.66, growth: 0.00, histidine: 10, isoleucine: 20, leucine: 39, lysine: 30, sulfurAAs: 15, aromaticAAs: 25, threonine: 15, tryptophan: 4.0, valine: 26, total: 183 }
];

const AminoAcidTable = () => {
  return (
    <div>
      <h2>年齢別 タンパク質とアミノ酸必要量</h2>
      <table border="1" cellPadding="4" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>年齢</th>
            <th>維持量</th>
            <th>成長量</th>
            <th>ヒスチジン</th>
            <th>イソロイシン</th>
            <th>ロイシン</th>
            <th>リシン</th>
            <th>含硫アミノ酸</th>
            <th>芳香族アミノ酸</th>
            <th>トレオニン</th>
            <th>トリプトファン</th>
            <th>バリン</th>
            <th>合計</th>
          </tr>
        </thead>
        <tbody>
          {aminoAcidData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.age}</td>
              <td>{row.maintenance}</td>
              <td>{row.growth}</td>
              <td>{row.histidine}</td>
              <td>{row.isoleucine}</td>
              <td>{row.leucine}</td>
              <td>{row.lysine}</td>
              <td>{row.sulfurAAs}</td>
              <td>{row.aromaticAAs}</td>
              <td>{row.threonine}</td>
              <td>{row.tryptophan}</td>
              <td>{row.valine}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AminoAcidTable;
