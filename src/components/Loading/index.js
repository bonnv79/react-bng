import styles from './styles.module.scss'

export function Loading({ open = false, className, ...props }) {

  return open && (
    <div className={`${styles.loading} ${className}`}>
      <div
        className={styles.loader}
        {...props}
      />
    </div>
  )
}

export default Loading