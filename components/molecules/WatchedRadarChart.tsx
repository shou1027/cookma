import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

type RefData = {
  refKey: string;
  data: number[];
};

type Props = {
  watchName: string;
  control: any;
  refData: RefData[];
  subjects: string[];
  watchDataKey: {
    ref: string;
    data: string;
  };
};

export const WatchedRadarChart = ({
  watchName,
  watchDataKey,
  refData,
  subjects,
  control,
}: Props) => {
  const watchData = useWatch({ name: watchName, control });

  const refDataObj = useMemo(() => {
    let _refDataObj: { [key: string]: RefData['data'] } = {};
    refData.forEach((value) => {
      _refDataObj[value.refKey] = value.data;
    });

    return _refDataObj;
  }, [refData]);
  console.log(111);
  console.log(refData);
  console.log(refDataObj);

  return (
    <RadarChart
      height={250}
      width={500}
      data={subjects.map((subject, index) => ({
        subject: subject,
        // A: watchData.reduce(
        //   (prevValue, currValue) =>
        //     prevValue +
        //     refDataObj[currValue[watchDataKey.ref]][index] *
        //       currValue[watchDataKey.data] *
        //       0.01,
        //   0,
        // ),
        A: 30,
        fullMark: 100,
      }))}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      {/* <PolarRadiusAxis angle={30} domain={[0, 100]} /> */}
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.5}
      />
    </RadarChart>
  );
};
