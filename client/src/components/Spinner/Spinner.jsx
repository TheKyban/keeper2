import styles from './Spinner.module.scss';
const Spinner = ({ size }) => <p className={styles.spinner} style={{ width: size ? size : '', height: size ? size : '' }}></p>;
export default Spinner;