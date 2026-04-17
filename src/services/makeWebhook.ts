/**
 * Service d'envoi vers le webhook Make (ex-Integromat).
 *
 * URL à configurer : VITE_MAKE_WEBHOOK_CONTACT dans .env.local
 * Laisser vide pour désactiver silencieusement.
 */

export interface WebhookContactPayload {
  association_id: string
  association_nom: string
  sports_recommandes: string[]
  prenom: string
  email: string
  timestamp: string
}

/**
 * Envoie une demande de contact au webhook Make.
 * Échoue silencieusement si l'URL n'est pas configurée.
 */
export async function sendContactWebhook(payload: WebhookContactPayload): Promise<void> {
  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_CONTACT

  if (!webhookUrl || webhookUrl === 'a_configurer') {
    console.info('[makeWebhook] URL non configurée — webhook ignoré', payload)
    return
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error("[makeWebhook] Erreur lors de l'envoi", err)
  }
}
