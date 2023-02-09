import { images } from "core/assets";
import styles from "./styles.module.scss";

interface IProps {
  title: string;
}

export default function LabelInfo({ title }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={images.infoLabelIcon} />
      </div>
      <div>{title}</div>
    </div>
  );
}
