import { CartesianGrid, Line, LineChart, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from './paths';

interface TPSDto {
  slot: number;
  tps: number;
}

const chartConfig = {
  TPS: {
    label: 'Transactions per Second',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function Index() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['tps'],
    queryFn: () =>
      fetch(`${API_URL}/tps`).then(async (res) => {
        try {
          // response is not received here in the test environment :/
          // console.log({ res });
          const result = (await res.json()) as TPSDto[];
          // console.log({ result });
          return result;
        } catch (e) {
          console.error(e);
          return [];
        }
      }),
  });

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-center text-3xl">Recent Solana TPS</h2>
      {isLoading && <div>Loading...</div>}
      {!!chartData && (
        <ChartContainer
          data-testid="tps-chart"
          config={chartConfig}
          className="max-h-[600px]"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            {/* <XAxis
            dataKey="slot"
            type="number"
            domain={['dataMin', 'dataMax']}
            interval="preserveStartEnd"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          /> */}

            <YAxis
              label={{ value: 'TPS', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="tps"
              type="natural"
              stroke="var(--color-TPS)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-TPS)',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      )}
    </section>
  );
}
