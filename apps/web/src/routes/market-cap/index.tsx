import { Cell, Label, Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../paths';

interface MarketCapDto {
  totalMarketCap: number;
  prices: {
    marketCap: number;
    symbol: string;
    iconUrl: string;
    name: string;
  }[];
}

const chartConfig = {
  // marketCap: {
  //   label: 'Market Cap',
  // },
  W: {
    label: 'Wormhole',
    color: 'hsl(var(--chart-1))',
  },
  WIF: {
    label: 'dogwifhat',
    color: 'hsl(var(--chart-2))',
  },
  MPLX: {
    label: 'Metaplex',
    color: 'hsl(var(--chart-3))',
  },
  JUP: {
    label: 'Jupiter',
    color: 'hsl(var(--chart-4))',
  },
  BONK: {
    label: 'Bonk',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

const chartColors = {} as Record<keyof typeof chartConfig, string>;
for (const key of Object.keys(chartConfig)) {
  chartColors[key as keyof typeof chartConfig] = `var(--color-${key})`;
}
console.log(chartColors);

export default function MarketCap() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['market-cap'],
    queryFn: () =>
      fetch(`${API_URL}/market-cap`).then(
        (res) => res.json() as Promise<MarketCapDto>,
      ),
  });

  return (
    <section>
      <h2 className="text-center text-3xl font-bold">
        Selected SPL Token Market Cap
      </h2>
      <p className="text-center text-foreground/50">
        Supply on Solana. Circulating supply may be different.
      </p>
      {isLoading && <div>Loading...</div>}
      {!!chartData && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[600px]"
          data-testid="market-cap-chart"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.prices}
              dataKey="marketCap"
              nameKey="symbol"
              innerRadius={150}
              strokeWidth={5}
              paddingAngle={2}
            >
              {Object.keys(chartColors).map((color) => (
                <Cell
                  key={`cell-${color}`}
                  fill={chartColors[color as keyof typeof chartConfig]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {`$${chartData?.totalMarketCap.toLocaleString('en-US')}`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Market Cap
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
    </section>
  );
}
