/**
 * Page listant toutes les associations partenaires du festival.
 * Les données viennent de Firestore via le hook useAssociations.
 */

import { useState } from 'react'
import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAssociations } from '../hooks/useFirestore'
import styles from './Associations.module.css'

export default function Associations() {
  const { data: associations, loading, error } = useAssociations()

  // Filtre par public cible
  const [filtrePublic, setFiltrePublic] = useState<string>('Tous')

  // Construire la liste unique des publics depuis toutes les associations
  const tousLesPublics = associations
    ? ['Tous', ...new Set(associations.flatMap((a) => a.publics))]
    : ['Tous']

  // Filtrer les associations selon le public sélectionné
  const associationsFiltrees =
    filtrePublic === 'Tous'
      ? associations
      : associations?.filter((a) => a.publics.includes(filtrePublic))

  if (loading) {
    return <LoadingSpinner message="Chargement des associations..." />
  }

  if (error) {
    return (
      <div className={styles.erreur} role="alert">
        <p>⚠️ Impossible de charger les associations : {error}</p>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      {/* En-tête de page */}
      <div className={styles.entete}>
        <div className={styles.conteneur}>
          <span className={styles.tag}>Partenaires</span>
          <h1 className={styles.titre}>Les associations du festival</h1>
          <p className={styles.soustitre}>
            {associations?.length ?? 0} associations partenaires réunies autour du sport inclusif
          </p>
        </div>
      </div>

      <div className={`${styles.conteneur} ${styles.corps}`}>
        {/* Filtres par public */}
        <div className={styles.filtres} role="group" aria-label="Filtrer par public">
          <span className={styles.filtresLabel}>Filtrer :</span>
          <div className={styles.filtresBoutons}>
            {tousLesPublics.map((public_) => (
              <button
                key={public_}
                className={`${styles.filtreBouton} ${filtrePublic === public_ ? styles.filtreBoutonActif : ''}`}
                onClick={() => setFiltrePublic(public_)}
                aria-pressed={filtrePublic === public_}
              >
                {public_}
              </button>
            ))}
          </div>
        </div>

        {/* Résultat du filtre */}
        {associationsFiltrees && associationsFiltrees.length > 0 ? (
          <div className={styles.grille}>
            {associationsFiltrees.map((asso) => (
              <Card
                key={asso.id}
                titre={asso.nom}
                description={asso.description}
                emoji="🤝"
                tags={[...asso.disciplines, ...asso.publics]}
              >
                {/* Liens de contact si disponibles */}
                <div className={styles.assoActions}>
                  {asso.siteWeb && (
                    <a
                      href={asso.siteWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.assoLien}
                    >
                      🌐 Site web
                    </a>
                  )}
                  {asso.email && (
                    <a href={`mailto:${asso.email}`} className={styles.assoLien}>
                      📧 Contact
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className={styles.vide}>
            Aucune association trouvée pour ce filtre.
          </p>
        )}
      </div>
    </main>
  )
}
