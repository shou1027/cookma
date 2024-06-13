import { Header } from '@/components/molecules/Header';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { Delete, Settings, VolumeDown, VolumeUp } from '@mui/icons-material';
import {
  Button,
  LinearProgress,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

export default function Home() {
  const [slider, setSlider] = useState(0);

  return (
    <MainTemplate
      headerElement={<Header />}
      mainElement={
        <>
          <TextField label="outlined" variant="outlined" type="number" />
          <Stack
            spacing={10}
            justifyContent="center"
            direction="row"
            sx={{ marginTop: 12.1 }}
          >
            <Button variant="outlined">aaiiuu</Button>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, maxWidth: 400, mx: 'auto' }}
            justifyContent="center"
          >
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={slider}
              max={100}
              min={0}
              onChange={(_event, value) => setSlider(value as number)}
            />
            <VolumeUp />
          </Stack>
          <LinearProgress
            variant="determinate"
            value={slider}
            sx={{ '.MuiLinearProgress-bar': { transition: 20 } }}
          />
          <Typography variant="body1" color="red" fontSize={30}>
            {slider}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="error">
              error
            </Button>
            <Button variant="contained" color="info">
              info
            </Button>
            <Button variant="contained" color="inherit" endIcon={<Delete />}>
              inherit
            </Button>
            <Button variant="contained" color="primary">
              primary
            </Button>
            <Button variant="contained" color="secondary">
              secondary
            </Button>
            <Button variant="contained" color="success">
              success
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<Settings color="info" />}
              endIcon={<Delete />}
            >
              warning
            </Button>
          </Stack>
          <RadarChart
            height={250}
            width={500}
            data={[
              {
                subject: '炭水化物',
                A: slider * 0.8 + 20,
                fullMark: 100,
              },
              {
                subject: 'タンパク質',
                A: 100 - slider * 0.8,
                fullMark: 100,
              },
              {
                subject: '脂質',
                A: slider * 0.5 + 50,
                fullMark: 100,
              },
              {
                subject: 'ビタミン',
                A: 100 - slider * 0.5,
                fullMark: 100,
              },
              {
                subject: 'ミネラル',
                A: 85,
                fullMark: 100,
              },
            ]}
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
        </>
      }
    />
  );
}
