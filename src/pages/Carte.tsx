/**
 * Page Carte — Google Maps plein écran avec markers des associations.
 * Design Figma : fond carte + markers numérotés + navbar bottom.
 */

import { useState } from 'react'
import { useAssociations } from '../hooks/useFirestore'
import styles from './Carte.module.css'

// Coordonnées festival (Parc de la Villette)
const MAP_CENTER_LAT = 48.8938
const MAP_CENTER_LNG = 2.3907
const MAP_ZOOM = 16

// URL embed Google Maps — Parc de la Villette
const buildMapUrl = (zoom: number) =>
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${2621 / zoom * 16}!2d${MAP_CENTER_LNG}!3d${MAP_CENTER_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dd47bf7ef2d%3A0x65a1c48c9a7c3572!2sParc%20de%20la%20Villette!5e0!3m2!1sfr!2sfr!4v1`

export default function Carte() {
  const { data: associations } = useAssociations()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedAsso = associations?.find((a) => a.id === selectedId)

  return (
    <div className={styles.page}>

      {/* ── En-tête flottant ── */}
      <div className={styles.header}>
        <h1 className={styles.headerTitre}>Carte du festival</h1>
        <p className={styles.headerSub}>
          {associations?.length ?? 0} stands · Parc de la Villette
        </p>
      </div>

      {/* ── Carte plein écran ── */}
      <div className={styles.mapWrap}>
        <iframe
          title="Carte des stands Solimouv'"
          src={buildMapUrl(MAP_ZOOM)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className={styles.mapIframe}
        />

        {/* Markers simulés — numérotés comme dans le Figma */}
        <div className={styles.markers} aria-label="Stands du festival">
          {associations?.slice(0, 5).map((asso, idx) => (
            <button
              key={asso.id}
              className={`${styles.marker} ${selectedId === asso.id ? styles.markerActif : ''}`}
              onClick={() => setSelectedId(selectedId === asso.id ? null : asso.id)}
              aria-pressed={selectedId === asso.id}
              aria-label={`Stand ${idx + 1} : ${asso.nom}`}
              style={{
                top: `${30 + idx * 10}%`,
                left: `${20 + idx * 13}%`,
              }}
            >
              <span className={styles.markerInner}>{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Drawer : détail association sélectionnée ── */}
      {selectedAsso && (
        <div className={styles.drawer} role="dialog" aria-label={`Détail ${selectedAsso.nom}`}>
          <button
            className={styles.drawerClose}
            onClick={() => setSelectedId(null)}
            aria-label="Fermer"
          >
            ✕
          </button>
          <h2 className={styles.drawerNom}>{selectedAsso.nom}</h2>
          <p className={styles.drawerDesc}>{selectedAsso.description.slice(0, 180)}…</p>
          <div className={styles.drawerTags}>
            {selectedAsso.disciplines.map((d) => (
              <span key={d} className={styles.drawerTag}>{d}</span>
            ))}
          </div>
          {selectedAsso.email && (
            <a href={`mailto:${selectedAsso.email}`} className={styles.drawerContact}>
              📧 {selectedAsso.email}
            </a>
          )}
        </div>
      )}

      {/* ── Liste des stands (scrollable en bas) ── */}
      <div className={styles.liste}>
        <h2 className={styles.listeTitre}>
          📍 Liste des stands ({associations?.length ?? 0})
        </h2>
        <ul className={styles.listeItems} role="list">
          {associations?.map((asso, idx) => (
            <li key={asso.id} role="listitem">
              <button
                className={`${styles.listeItem} ${selectedId === asso.id ? styles.listeItemActif : ''}`}
                onClick={() => setSelectedId(selectedId === asso.id ? null : asso.id)}
              >
                <span className={styles.listeMarker}>{idx + 1}</span>
                <div className={styles.listeItemContent}>
                  <span className={styles.listeItemNom}>{asso.nom}</span>
                  <span className={styles.listeItemDiscs}>
                    {asso.disciplines.slice(0, 2).join(' · ')}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
