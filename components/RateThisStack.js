import { useState } from 'react';

export default function RateThisStack() {
  const [rating, setRating] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 shadow-md">
      <h3 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400">📊 Rate This Stack</h3>
      <p className="mb-2 text-sm">How would you rate the PlainUtils tech stack?</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            className={`px-3 py-1 rounded border font-medium transition ${
              rating === num
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-400 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      {rating && <p className="mt-3 text-sm text-green-600">Thanks! You rated it {rating}/5 🌟</p>}
    </div>
  );
}

