import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

interface ITab {
  label: string;
  key: string;
  element: any;
}

interface IProps {
  defaultKey?: string;
  listTab: ITab[];
}

export default function SubHeader(props: IProps) {
  const { defaultKey, listTab } = props;
  // const navigate = useNavigate();

  const [tabActive, setTabActive] = useState(defaultKey ?? listTab?.[0].key);

  // useEffect(() => {
  //   navigate(tabActive, { replace: true });
  // }, [tabActive]);

  // const handleChangeTab = (tabClicked: string) => {
  //   setTabActive(tabClicked);
  // };

  return (
    <TabContext value={tabActive}>
      <TabList
        className={styles.tabListCustom}
        onChange={(e, tabClicked) => setTabActive(tabClicked)}
      >
        {listTab?.map((tab) => (
          <Tab label={tab.label} value={tab.key} key={tab.key}></Tab>
        ))}
      </TabList>
      {listTab?.map((tab, index) => (
        <TabPanel value={tab.key} key={index} className={styles.tabPanel}>
          {tab.element}
        </TabPanel>
      ))}
    </TabContext>
  );
}
