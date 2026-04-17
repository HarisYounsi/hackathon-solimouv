/**
 * Algorithme de scoring du Quiz Sport Matcher.
 *
 * Pour chaque réponse donnée :
 *   - on récupère les sports_associes[] de l'option choisie
 *   - on incrémente le compteur de chaque sport
 * On trie par score décroissant et on retourne le top 3.
 */

import type { QuizOption } from '../types'

export interface SportScore {
  sport: string
  score: number
}

/**
 * Calcule le classement des sports à partir des réponses du quiz.
 * @param reponses - Map questionId → option choisie
 * @returns Tableau de sports triés par score décroissant
 */
export function calculerScores(reponses: Record<string, QuizOption>): SportScore[] {
  const compteur: Record<string, number> = {}

  for (const option of Object.values(reponses)) {
    for (const sport of option.sports_associes) {
      compteur[sport] = (compteur[sport] ?? 0) + 1
    }
  }

  return Object.entries(compteur)
    .map(([sport, score]) => ({ sport, score }))
    .sort((a, b) => b.score - a.score)
}

/**
 * Retourne les 3 sports les mieux classés.
 */
export function getTop3Sports(reponses: Record<string, QuizOption>): string[] {
  return calculerScores(reponses).slice(0, 3).map((s) => s.sport)
}
