"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	sales: {
		label: "Sales",
		color: "#2563eb",
	},
	customers: {
		label: "Customers",
		color: "#60a5fa",
	},
} satisfies ChartConfig;


export default function ChartComponent({ chartData }: { chartData: Chart[] }) {
	
	return (
		<ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='month'
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis
					axisLine={false}
					tickLine={false}
					tickMargin={10}
					tickCount={5}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey='sales' fill='var(--color-sales)' radius={4} />
				<Bar dataKey='customers' fill='var(--color-customers)' radius={4} />
			</BarChart>
		</ChartContainer>
	);
}