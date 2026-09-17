#!/usr/bin/env node
/**
 * The Ultimate Quiz - question bank validator
 *
 * Run:
 *   node validate_questions.js
 *
 * The script deliberately fails with a non-zero exit code if the question
 * bank contains a structural problem. Run it before publishing a new
 * questions.js file.
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'questions.js');
const source = fs.readFileSync(file, 'utf8');
const match = source.match(/const\s+QUESTIONS\s*=\s*(\[[\s\S]*\]);/);

if (!match) {
    console.error('❌ Could not find the QUESTIONS array in questions.js');
    process.exit(1);
}

let questions;
try {
    questions = JSON.parse(match[1]);
} catch (error) {
    console.error('❌ questions.js contains invalid JSON:', error.message);
    process.exit(1);
}

const allowedDifficulties = new Set(['easy', 'medium', 'hard']);
const requiredCategories = new Set([
    'Gaming',
    'Music',
    'TV and Film',
    'History',
    'General Knowledge',
    'Science',
    'Geography',
    'Maths'
]);

const errors = [];
const warnings = [];
const ids = new Set();
const questionTexts = new Map();
const categoryCounts = new Map();
const difficultyCounts = new Map();

const normalise = value => String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

if (!Array.isArray(questions) || questions.length === 0) {
    errors.push('QUESTIONS must be a non-empty array.');
}

(questions || []).forEach((q, index) => {
    const where = `Question ${index + 1}`;

    if (!q || typeof q !== 'object') {
        errors.push(`${where}: question is not an object.`);
        return;
    }

    for (const field of ['id', 'difficulty', 'question', 'answers', 'correct', 'category']) {
        if (!(field in q)) errors.push(`${where}: missing ${field}.`);
    }

    if (typeof q.id !== 'string' || !q.id.trim()) {
        errors.push(`${where}: id must be a non-empty string.`);
    } else if (ids.has(q.id)) {
        errors.push(`${where}: duplicate id "${q.id}".`);
    } else {
        ids.add(q.id);
    }

    if (!allowedDifficulties.has(q.difficulty)) {
        errors.push(`${where}: invalid difficulty "${q.difficulty}".`);
    } else {
        difficultyCounts.set(q.difficulty, (difficultyCounts.get(q.difficulty) || 0) + 1);
    }

    if (typeof q.category !== 'string' || !q.category.trim()) {
        errors.push(`${where}: missing category.`);
    } else {
        categoryCounts.set(q.category, (categoryCounts.get(q.category) || 0) + 1);
        if (!requiredCategories.has(q.category)) {
            warnings.push(`${where}: new/unrecognised category "${q.category}".`);
        }
    }

    if (typeof q.question !== 'string' || !q.question.trim()) {
        errors.push(`${where}: question text is empty.`);
    } else {
        const key = normalise(q.question);
        if (questionTexts.has(key)) {
            warnings.push(`${where}: duplicate question text (also question ${questionTexts.get(key)}).`);
        } else {
            questionTexts.set(key, index + 1);
        }
    }

    if (!Array.isArray(q.answers) || q.answers.length !== 4) {
        errors.push(`${where}: must contain exactly 4 answer choices.`);
        return;
    }

    const normalisedAnswers = q.answers.map(normalise);
    const duplicateAnswers = normalisedAnswers.filter((answer, i) =>
        normalisedAnswers.indexOf(answer) !== i
    );

    if (duplicateAnswers.length) {
        errors.push(`${where}: answer choices are not all unique.`);
    }

    if (q.answers.some(answer => typeof answer !== 'string' || !answer.trim())) {
        errors.push(`${where}: answer choices must all be non-empty strings.`);
    }

    const correctMatches = q.answers.filter(answer => answer === q.correct).length;
    if (correctMatches !== 1) {
        errors.push(`${where}: correct answer must match exactly one answer choice.`);
    }

    if (typeof q.correct !== 'string' || !q.correct.trim()) {
        errors.push(`${where}: correct answer is empty.`);
    }
});

console.log('');
console.log('THE ULTIMATE QUIZ — QUESTION BANK VALIDATION');
console.log('='.repeat(48));
console.log(`Questions checked: ${questions.length}`);
console.log('Duplicate question text is reported as a warning so the game can still run while the bank is being expanded.');
console.log('');

console.log('Categories:');
for (const category of [...requiredCategories].sort()) {
    console.log(`  ${category.padEnd(20)} ${categoryCounts.get(category) || 0}`);
}

console.log('');
console.log('Difficulty:');
for (const difficulty of ['easy', 'medium', 'hard']) {
    console.log(`  ${difficulty.padEnd(20)} ${difficultyCounts.get(difficulty) || 0}`);
}

console.log('');
if (warnings.length) {
    console.log(`⚠️  Warnings: ${warnings.length}`);
    warnings.slice(0, 20).forEach(warning => console.log(`   ${warning}`));
    if (warnings.length > 20) console.log(`   …and ${warnings.length - 20} more.`);
    console.log('');
}

if (errors.length) {
    console.error(`❌ FAILED — ${errors.length} error(s) found.`);
    errors.slice(0, 100).forEach(error => console.error(`   ${error}`));
    if (errors.length > 100) console.error(`   …and ${errors.length - 100} more.`);
    process.exit(1);
}

console.log('✅ PASSED — every question has a unique ID, unique four-choice answer set, exactly one keyed answer, valid difficulty, category and non-empty question text.');
console.log('');
