import { useQuery } from "react-query";
import {
  getListPosition,
  getListSkill,
  getListLevel,
  getListExperience,
  getListSchool,
  getListPersonnelType,
  getListContractType,
} from "core/api/common";
import {
  GET_LIST_POSITION,
  GET_LIST_SKILL,
  GET_LIST_SCHOOL,
  GET_LIST_LEVEL,
  GET_LIST_EXPERIENCE,
  GET_LIST_PERSONNEL_TYPE,
  GET_LIST_CONTRACT_TYPE
} from "core/constants/queryName";
import storage from "core/helpers/storage";

export const useMasterData = () => {
  const { data: dataPosition } = useQuery(
    [GET_LIST_POSITION],
    getListPosition,
    { enabled: !!storage.getToken() }
  );
  const { data: dataSkill } = useQuery([GET_LIST_SKILL], getListSkill, {
    enabled: !!storage.getToken(),
  });
  const { data: dataLevel } = useQuery([GET_LIST_LEVEL], getListLevel, {
    enabled: !!storage.getToken(),
  });
  const { data: dataSchool } = useQuery([GET_LIST_SCHOOL], getListSchool, {
    enabled: !!storage.getToken(),
  });
  const { data: dataExperience } = useQuery(
    [GET_LIST_EXPERIENCE],
    getListExperience,
    { enabled: !!storage.getToken() }
  );
  const { data: dataPersonnelType } = useQuery(
    [GET_LIST_PERSONNEL_TYPE],
    getListPersonnelType,
    { enabled: !!storage.getToken() }
  );
  const { data: dataContractType } = useQuery(
    [GET_LIST_CONTRACT_TYPE],
    getListContractType,
    { enabled: !!storage.getToken() }
  );
  return {
    listPosition: dataPosition?.data,
    listSkill: dataSkill?.data,
    listLevel: dataLevel?.data,
    listSchool: dataSchool?.data,
    listExperience: dataExperience?.data,
    listPersonnelType: dataPersonnelType?.data,
    listContractType: dataContractType?.data,
  };
};
