import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../paths';

interface WalletDto {
  address: string;
  balance: number;
}

const chartConfig = {
  balance: {
    label: 'SOL Balance',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export default function Wallets() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['market-cap'],
    queryFn: () =>
      fetch(`${API_URL}/wallets`).then(
        (res) => res.json() as Promise<WalletDto[]>,
      ),
  });

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-center text-3xl font-bold">Wallets</h1>
      <p className="text-center text-foreground/50">
        Some random wallets from the rich list... that I guess don't always have
        funds.
      </p>
      {isLoading && <div>Loading...</div>}
      {!!chartData && (
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full"
          data-testid="wallets-chart"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="address"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(address: string) =>
                `${address.slice(0, 4)}...${address.slice(-4)}`
              }
            />
            <YAxis tickFormatter={(value) => value.toLocaleString()} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="balance" fill="var(--color-balance)" />
          </BarChart>
        </ChartContainer>
      )}
    </section>
  );
}
