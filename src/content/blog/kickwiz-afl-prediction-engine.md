---
title: "KickWiz: Building an AFL Prediction Engine with Five AI Models"
description: "How we built an Australian Rules football intelligence system using an ensemble of five AI models — and what we learned about prediction, uncertainty, and the beautiful chaos of AFL."
date: 2025-04-17
author: "Jose Martins"
tags: ["kickwiz", "ai", "afl", "machine-learning"]
---

## The Problem with AFL Predictions

Australian Rules Football is one of the hardest sports to predict. Eighteen players per side, a circular ball, an oval ground, and a scoring system that rewards both goals and behinds — the variables are nearly infinite. Most prediction models fail because they try to reduce the game to a single number.

We took a different approach. Instead of one model trying to predict everything, we built five specialised models that each "see" the game differently — then we let them collaborate.

## Five Models, One Prediction

The KickWiz prediction framework is an ensemble — a term from machine learning that means combining the outputs of multiple models to produce a better result than any single model alone.

Each of our five models focuses on a specific dimension of the game:

1. **Form Model** — tracks recent performance trends at the club and individual player level, weighted by recency and opponent quality.

2. **Matchup Model** — analyses historical head-to-head data between clubs, including home/away records, margin distributions, and quarter-by-quarter patterns.

3. **Player Impact Model** — assesses the influence of key players on team performance. Injuries, suspensions, and form dips are factored in dynamically.

4. **Conditions Model** — integrates weather data, ground size, and surface type. A wet MCG plays very differently from a dry Optus Stadium.

5. **Momentum Model** — captures psychological and contextual factors: travel schedules, consecutive wins/losses, finals pressure, and inter-state travel fatigue.

## How the Ensemble Works

Each model outputs a probability distribution — not just "Team A wins" but "Team A wins 64% of the time, with a likely margin of 12–22 points." These distributions are weighted and combined using a meta-learner that has been trained on historical prediction accuracy per model per scenario.

The result is a confidence-aware prediction: you see not just the pick, but how confident the system is in it, and which models agree or disagree. Disagreement between models is itself a signal — it usually means the game is genuinely hard to predict.

## Player and Season Predictions

Beyond match outcomes, KickWiz supports:

- **Player performance predictions**: disposals, goals, marks, tackles — with confidence intervals
- **Season simulations**: run Monte Carlo simulations across the remaining draw to forecast ladder positions and finals odds
- **Brownlow Medal tracking**: accumulating vote predictions as the season progresses

## What We Learned

Building KickWiz taught us something important: good AI predictions aren't just about accuracy — they're about *calibrated* accuracy. A model that says "70% confidence" should be right about 70% of the time. Getting calibration right across five different models, on a sport as chaotic as AFL, is the real engineering challenge.

We also learned that users trust predictions more when they understand them. Showing the model breakdown — "our Form Model strongly favours Richmond, but our Matchup Model is uncertain" — builds more trust than a black-box percentage.

KickWiz is available now. Download it, pick your teams, and let the models do the work.
