import styles from './Text.module.scss';

const Text = ({ text }) => {
    return <h1 data-text={text} id={styles.text}>{text}</h1>;
};

export default Text;