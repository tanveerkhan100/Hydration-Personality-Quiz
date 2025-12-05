import React, { useState } from 'react';
import './App.css';

export default function HydrationPersonalityQuiz() {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const inputBase =
    'w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm';

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all answered
    const missing = Object.values(answers).some((v) => !v);
    if (missing) {
      setError(
        'Please answer all questions to see your hydration personality.'
      );
      setResult(null);
      return;
    }

    const type = calculatePersonality(answers);
    setResult(type);
  };

  const calculatePersonality = (a) => {
    // Score buckets
    let minimalist = 0; // drinks very little / forgets
    let chugger = 0; // drinks in large bursts
    let steady = 0; // consistent
    let overachiever = 0; // drinks a lot / very structured

    // Q1 – How often do you think about drinking water?
    if (a.q1 === 'rarely') minimalist += 2;
    if (a.q1 === 'onlyThirsty') chugger += 1;
    if (a.q1 === 'reminders') steady += 2;
    if (a.q1 === 'automatic') overachiever += 2;

    // Q2 – Typical daily intake
    if (a.q2 === 'under1') minimalist += 2;
    if (a.q2 === '1to1_5') minimalist += 1;
    if (a.q2 === '1_5to2_5') steady += 2;
    if (a.q2 === 'over2_5') overachiever += 2;

    // Q3 – How do you usually drink?
    if (a.q3 === 'forgetThenChug') chugger += 2;
    if (a.q3 === 'smallSips') steady += 2;
    if (a.q3 === 'barelyDrink') minimalist += 2;
    if (a.q3 === 'timed') overachiever += 2;

    // Q4 – Urine color
    if (a.q4 === 'dark') minimalist += 2;
    if (a.q4 === 'mid') chugger += 1;
    if (a.q4 === 'light') steady += 2;
    if (a.q4 === 'veryLight') overachiever += 2;

    // Q5 – What happens on busy days?
    if (a.q5 === 'forget') minimalist += 2;
    if (a.q5 === 'bigCatchUp') chugger += 2;
    if (a.q5 === 'mostlySame') steady += 2;
    if (a.q5 === 'planAhead') overachiever += 2;

    // Q6 – Main motivation
    if (a.q6 === 'onlyIfThirsty') minimalist += 1;
    if (a.q6 === 'performance') steady += 1;
    if (a.q6 === 'optimizeEverything') overachiever += 2;
    if (a.q6 === 'avoidHeadache') chugger += 1;

    const scores = [
      { key: 'minimalist', score: minimalist },
      { key: 'chugger', score: chugger },
      { key: 'steady', score: steady },
      { key: 'overachiever', score: overachiever },
    ];

    scores.sort((a, b) => b.score - a.score);
    const top = scores[0].key;

    return personalityProfiles[top];
  };

  const personalityProfiles = {
    minimalist: {
      label: '💤 The Hydration Minimalist',
      summary:
        'You tend to under-prioritize hydration and often rely on strong thirst or symptoms before drinking.',
      traits: [
        'Frequently forgets to drink, especially on busy days.',
        'Often drinks less than 1–1.5L per day.',
        'Urine may be darker or more concentrated.',
      ],
      tips: [
        'Place a visible bottle where you work or study.',
        'Anchor sips to existing habits (after bathroom, before meals, etc.).',
        'Aim for a small glass of water within 15–20 minutes of waking.',
      ],
    },
    chugger: {
      label: '🚰 The Last-Minute Chugger',
      summary:
        'You go long stretches without drinking, then suddenly chug large amounts when you remember or feel rough.',
      traits: [
        'Hydration comes in big bursts, not steady sips.',
        'Might feel bloated after large drinks.',
        'Busy days make you forget, then you overcompensate.',
      ],
      tips: [
        'Use mini check-ins: 2–3 big reminders across the day instead of only night.',
        'Keep a medium bottle (500–750ml) and aim to finish one before lunch, one before dinner.',
        'Try to drink smaller amounts more frequently, especially around workouts.',
      ],
    },
    steady: {
      label: '🌊 The Steady Streamer',
      summary:
        'You’re generally consistent with hydration and tend to get enough without overthinking it.',
      traits: [
        'Water intake is fairly balanced through the day.',
        'Urine is usually light yellow or pale.',
        'Busy days may shift timing a bit but don’t fully derail you.',
      ],
      tips: [
        'Keep your current rhythm, but front-load a bit more hydration earlier in the day.',
        'Fine-tune around workouts, heat, or long fasting windows.',
        'Monitor urine color and energy levels as simple feedback loops.',
      ],
    },
    overachiever: {
      label: '💠 The Hydration Overachiever',
      summary:
        'You’re highly intentional about hydration and may even overshoot sometimes.',
      traits: [
        'Often tracks water intake or uses specific goals.',
        'Urine may be very pale or nearly clear.',
        'You think ahead about heat, workouts, or long days.',
      ],
      tips: [
        'Avoid forcing water beyond thirst and comfort.',
        'Make sure electrolytes are adequate if you drink very large volumes.',
        'Focus more on quality (timing + electrolytes) rather than just quantity.',
      ],
    },
  };

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center py-10 px-4'>
      <div className='w-full max-w-xl bg-white shadow-md rounded-xl p-6'>
        <h2 className='text-2xl font-semibold text-center mb-2'>
          Hydration Personality Quiz
        </h2>
        <p className='text-gray-500 text-xs text-center mb-5'>
          Find out your hydration style so you can make smarter tweaks, not
          random changes.
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Q1 */}
          <div>
            <p className='text-sm font-medium mb-1'>
              1. How often do you *think* about drinking water?
            </p>
            <select
              className={inputBase}
              value={answers.q1}
              onChange={(e) => handleChange('q1', e.target.value)}
            >
              <option value=''>Select an option</option>
              <option value='rarely'>
                I mostly forget unless I'm very thirsty.
              </option>
              <option value='onlyThirsty'>Only when I feel thirsty.</option>
              <option value='reminders'>
                When my bottle, app, or habit reminds me.
              </option>
              <option value='automatic'>
                It’s automatic; I drink throughout the day.
              </option>
            </select>
          </div>

          {/* Q2 */}
          <div>
            <p className='text-sm font-medium mb-1'>
              2. On a typical day, how much water do you drink?
            </p>
            <select
              className={inputBase}
              value={answers.q2}
              onChange={(e) => handleChange('q2', e.target.value)}
            >
              <option value=''>Select an option</option>
              <option value='under1'>Under 1L</option>
              <option value='1to1_5'>1–1.5L</option>
              <option value='1_5to2_5'>1.5–2.5L</option>
              <option value='over2_5'>More than 2.5L</option>
            </select>
          </div>

          {/* Q3 */}
          <div>
            <p className='text-sm font-medium mb-1'>
              3. Which best describes your drinking pattern?
            </p>
            <select
              className={inputBase}
              value={answers.q3}
              onChange={(e) => handleChange('q3', e.target.value)}
            >
              <option value=''>Select an option</option>
              <option value='barelyDrink'>
                I barely drink unless I force myself.
              </option>
              <option value='forgetThenChug'>
                I forget, then chug a lot all at once.
              </option>
              <option value='smallSips'>Small sips through the day.</option>
              <option value='timed'>
                Very intentional: I have specific times/bottles to finish.
              </option>
            </select>
          </div>

          {/* Q4 */}
          <div>
            <p className='text-sm font-medium mb-1'>
              4. Most of the time, how does your urine color look?
            </p>
            <select
              className={inputBase}
              value={answers.q4}
              onChange={(e) => handleChange('q4', e.target.value)}
            >
              <option value=''>Select an option</option>
              <option value='dark'>Dark yellow or amber</option>
              <option value='mid'>Medium yellow</option>
              <option value='light'>Light yellow</option>
              <option value='veryLight'>Very pale or almost clear</option>
            </select>
          </div>

          {/* Q5 */}
          <div>
            <p className='text-sm font-medium mb-1'>
              5. On really busy days, what usually happens to your hydration?
            </p>
            <select
              className={inputBase}
              value={answers.q5}
              onChange={(e) => handleChange('q5', e.target.value)}
            >
              <option value=''>Select an option</option>
              <option value='forget'>
                I barely drink and forget most of the day.
              </option>
              <option value='bigCatchUp'>
                I realize late and then drink a ton at once.
              </option>
              <option value='mostlySame'>
                It’s slightly off, but still somewhat consistent.
              </option>
              <option value='planAhead'>
                I plan ahead with bottles or reminders for the busy day.
              </option>
            </select>
          </div>

          {/* Q6 */}
          <div>
            <p className='text-sm font-medium mb-1'>
              6. What mainly motivates you to drink water?
            </p>
            <select
              className={inputBase}
              value={answers.q6}
              onChange={(e) => handleChange('q6', e.target.value)}
            >
              <option value=''>Select an option</option>
              <option value='onlyIfThirsty'>
                Only if I feel really thirsty or dry.
              </option>
              <option value='avoidHeadache'>
                To avoid headaches, fatigue, or feeling “off.”
              </option>
              <option value='performance'>
                To support energy, focus, or workouts.
              </option>
              <option value='optimizeEverything'>
                I like optimizing everything — hydration included.
              </option>
            </select>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition'
          >
            Reveal My Hydration Personality
          </button>
        </form>

        {error && (
          <p className='mt-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm'>
            {error}
          </p>
        )}

        {/* RESULT */}
        {result && (
          <div className='bg-gray-50 p-4 rounded-lg shadow-inner mt-6'>
            <h3 className='text-lg font-semibold mb-1'>{result.label}</h3>
            <p className='text-sm text-gray-700 mb-3'>{result.summary}</p>

            <h4 className='text-sm font-semibold mb-1'>Typical Patterns:</h4>
            <ul className='list-disc list-inside text-sm text-gray-700 space-y-1 mb-3'>
              {result.traits.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <h4 className='text-sm font-semibold mb-1'>Next-Step Tweaks:</h4>
            <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
              {result.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <p className='text-[11px] text-gray-400 mt-3'>
              This quiz is for habit insight, not medical diagnosis. Use it to
              guide small, consistent hydration upgrades.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
