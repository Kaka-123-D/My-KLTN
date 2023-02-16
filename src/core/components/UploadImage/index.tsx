import { CameraOutlined } from "@ant-design/icons";
import { useEffect } from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";

interface IProps {
  currentAvatar?: File | null;
  setCurrentAvatar: Function;
  image?: string;
}

export default function UploadImage({
  currentAvatar,
  setCurrentAvatar,
  image,
}: IProps) {
  useEffect(() => {
    const inputFile = document.querySelector("#input-file") as HTMLInputElement;
    const avatar = document.querySelector("#avatar") as HTMLImageElement;
    inputFile.addEventListener("change", (e) => {
      const file = inputFile.files && inputFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (result) {
            avatar.src = result;
            setCurrentAvatar(file);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleSelectFile = () => {
    const inputFile = document.querySelector("#input-file") as HTMLInputElement;
    inputFile.click();
  };

  return (
    <div className={styles.container} onClick={handleSelectFile}>
      <img
        id="avatar"
        className={classNames(styles.avatar, {
          "d-none": !currentAvatar && !image,
        })}
        src={image}
      />
      <div
        className={classNames(styles.placeholder, {
          "d-none": currentAvatar || image,
        })}
      >
        <CameraOutlined />
      </div>
      <input type="file" hidden id="input-file" />
    </div>
  );
}
