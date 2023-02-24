import { Grid } from "@mui/material";
import { Carousel, Spin, Empty } from "antd";
import { apiGetListClass } from "core/api/common";
import { GET_LIST_CLASS } from "core/constants/queryName";
import { useQuery } from "react-query";
import BoxClassInfo from "./BoxClassInfo";

interface IPropsCarousel {
  list: any;
  children: any;
}

const listClassFake = [
  { id: 1, name: "class 1", description: "day la class 1" },
  { id: 2, name: "class 2", description: "day la class 2" },
  { id: 3, name: "class 3", description: "day la class 3" },
  { id: 4, name: "class 4", description: "day la class 4" },
  { id: 5, name: "class 5", description: "day la class 5" },
  { id: 6, name: "class 6", description: "day la class 6" },
  { id: 7, name: "class 7", description: "day la class 7" },
];

const ListClass = () => {
  const { data: listClass, isLoading: isLoadingGetListClass } = useQuery(
    GET_LIST_CLASS,
    apiGetListClass
  );

  const CarouselContainer = ({ list = [], children }: IPropsCarousel) => {
    if (list.length < 2) return children;
    return <Carousel autoplay>{children}</Carousel>;
  };

  const convertArrayOfArray = (
    parentArray: any = [],
    lengthSubArray: number
  ) => {
    let newArray = [];
    let subArray = [];
    let count = 0;
    while (count < parentArray.length) {
      if (count % lengthSubArray !== 0) subArray.push(parentArray[count]);
      else {
        if (count !== 0) newArray.push(subArray);
        subArray = [parentArray[count]];
      }
      count++;
    }
    newArray.push(subArray);
    return newArray;
  };

  return (
    <div class>
      {isLoadingGetListClass && <Spin />}
      {!isLoadingGetListClass && listClassFake.length !== 0 && (
        <CarouselContainer list={convertArrayOfArray(listClassFake, 6)}>
          {convertArrayOfArray(listClassFake, 6).map((subArray, index) => (
            <Grid container key={index} className="d-flex" spacing={1.5}>
              {subArray.map((item: any, _index: number) => (
                <Grid item xs={4} key={_index}>
                  <BoxClassInfo
                    title={item.name}
                    description={item.description}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </CarouselContainer>
      )}

      {!isLoadingGetListClass && listClassFake.length === 0 && (
        <div className="d-flex-c-c w-100">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default ListClass;
