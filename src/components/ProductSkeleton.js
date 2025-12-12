import styles from './ProductSkeleton.module.css';

export default function ProductSkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonPrice} />
        </div>
    );
}
