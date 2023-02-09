import { useAuth } from "auth/contexts/AuthProvider";
import { useTranslation } from "react-i18next";

import { GenderType } from "core/constants/enums";

export default function useTransformIdToText() {
  const [t] = useTranslation();
  const { listPosition, listSkill, listLevel } = useAuth();

  const transformGender = (id: number) => {
    if (id === GenderType.MALE) {
      return t("text.male");
    }
    if (id === GenderType.FEMALE) {
      return t("text.female");
    }
    return t("text.other");
  };

  const transformPosition = (id: number) => {
    return listPosition.find((item: any) => item.id === id)?.name;
  };
  const transformSkill = (id: number) => {
    return listSkill.find((item: any) => item.id === id)?.name;
  };
  const transformLevel = (id: number) => {
    return listLevel.find((item: any) => item.id === id)?.name;
  };

  return { transformGender, transformPosition, transformSkill, transformLevel };
}
