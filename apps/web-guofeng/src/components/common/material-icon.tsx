type MaterialIconProps = {
  name: string
  className?: string
}

export function MaterialIcon({ name, className }: MaterialIconProps) {
  return <span className={`material-icons ${className ?? ''}`.trim()}>{name}</span>
}

