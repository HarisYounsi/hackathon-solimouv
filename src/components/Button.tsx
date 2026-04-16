/**
 * Bouton réutilisable avec plusieurs variantes visuelles.
 * Compatible avec les liens internes (React Router) et les liens externes.
 */

import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type VarianteButton = 'primaire' | 'secondaire' | 'contour' | 'texte'
type TailleButton = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  /** Texte affiché dans le bouton */
  children: React.ReactNode
  /** Style visuel du bouton */
  variante?: VarianteButton
  /** Taille du bouton */
  taille?: TailleButton
  /** Désactive le bouton */
  disabled?: boolean
  /** Classe CSS supplémentaire */
  className?: string
}

// Props pour un bouton HTML classique
interface ButtonHTMLProps extends ButtonBaseProps {
  as?: 'button'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  href?: never
  to?: never
  externe?: never
}

// Props pour un lien React Router interne
interface ButtonLinkProps extends ButtonBaseProps {
  as: 'link'
  to: string
  onClick?: never
  type?: never
  href?: never
  externe?: never
}

// Props pour un lien externe (balise <a>)
interface ButtonExterneProps extends ButtonBaseProps {
  as: 'externe'
  href: string
  onClick?: never
  type?: never
  to?: never
  externe?: never
}

type ButtonProps = ButtonHTMLProps | ButtonLinkProps | ButtonExterneProps

export default function Button({
  children,
  variante = 'primaire',
  taille = 'md',
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  const classes = [
    styles.bouton,
    styles[variante],
    styles[taille],
    disabled ? styles.disabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  // Lien React Router interne
  if (props.as === 'link' && 'to' in props) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  // Lien externe
  if (props.as === 'externe' && 'href' in props) {
    return (
      <a
        href={props.href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  // Bouton HTML classique (défaut)
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={'onClick' in props ? props.onClick : undefined}
      type={'type' in props ? props.type ?? 'button' : 'button'}
    >
      {children}
    </button>
  )
}
