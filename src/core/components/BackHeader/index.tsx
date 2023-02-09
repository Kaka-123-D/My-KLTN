import { useNavigate } from "react-router-dom";

import { images } from "core/assets";
import styles from "./styles.module.scss";

interface IProps {
  title: string;
  onBack?: () => void;
}

export default function BackHeader({ title, onBack }: IProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={onBack || handleBack}>
        <img src={images.arrowBack} />
      </div>
      <div>{title}</div>
    </div>
  );
}
