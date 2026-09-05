import './Card.css'

function Card({ children, padded = true, className = '', onClick }) {
  const classNames = ['card', padded ? 'card--padded' : '', className].filter(Boolean).join(' ')
  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card
