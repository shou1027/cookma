import { useWatch } from 'react-hook-form';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

type RefData = {
  refKey: string;
  data: number[];
};

type Props = {
  watchName: string;
  control: any;
  getValues: any;
  refData: RefData[];
  subjects: string[];
  watchDataKey: {
    ref: string;
    data: string;
  };
};

export const WatchedRadarChart = ({
  watchName,
  control,
  getValues,
  refData,
  subjects,
  watchDataKey,
}: Props) => {
  const watchData = useWatch({ name: watchName, control });

  return (
    <RadarChart
      height={250}
      width={500}
      data={subjects.map((subject, index) => ({
        subject: subject,
        A: getValues(watchName).reduce((prevValue, currValue) => {
          return (
            prevValue +
            (currValue[watchDataKey.ref] in refData
              ? refData[currValue[watchDataKey.ref]][index]
              : 0) *
              currValue[watchDataKey.data] *
              0.01
          );
        }, 0),
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
