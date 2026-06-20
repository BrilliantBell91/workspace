'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  // 숫자 증가
  const increment = () => setCount(count + 1);

  // 숫자 감소
  const decrement = () => setCount(count - 1);

  // 카운터 초기화
  const reset = () => setCount(0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-80">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          카운터
        </h1>

        {/* 카운트 표시 */}
        <div className="text-6xl font-bold text-center text-indigo-600 mb-8">
          {count}
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={decrement}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            -
          </button>

          <button
            onClick={increment}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            +
          </button>
        </div>

        {/* 초기화 버튼 */}
        <button
          onClick={reset}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
