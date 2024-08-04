import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Props {
	invoiceLength: number;
	todoLength: number;
	totalCustomers: number;
	totalSales: number;
}
export default function CardComponent({
	invoiceLength,
	todoLength,
	totalCustomers,
	totalSales,
}: Props) {
	return (
		<div className='md:space-y-4'>
			<div className='w-full flex flex-row items-center md:space-x-3'>
				<Card className='md:w-1/2 w-full md:mb-0 mb-4 flex flex-col items-center justify-center'>
					<CardHeader>
						<CardDescription>Total Sales</CardDescription>
					</CardHeader>
					<CardContent>
						<h2 className='text-2xl font-bold text-[#009FBD]'>
							{formatCurrency(totalSales)}
						</h2>
					</CardContent>
				</Card>

				<Card className='md:w-1/2 w-full md:mb-0 mb-4 flex flex-col items-center justify-center'>
					<CardHeader>
						<CardDescription>Number of Customers</CardDescription>
					</CardHeader>
					<CardContent>
						<h2 className='text-2xl font-bold text-[#E88D67]'>
							{totalCustomers}
						</h2>
					</CardContent>
				</Card>
			</div>

			<div className='w-full flex flex-row  items-center md:space-x-3'>
				<Card className='md:w-1/2 w-full md:mb-0 mb-4 flex flex-col items-center justify-center'>
					<CardHeader>
						<CardDescription>Pending Tasks</CardDescription>
					</CardHeader>
					<CardContent>
						<h2 className='text-2xl font-bold text-[#D71313]'>{todoLength}</h2>
					</CardContent>
				</Card>

				<Card className='md:w-1/2 w-full md:mb-0 mb-4 flex flex-col items-center justify-center'>
					<CardHeader>
						<CardDescription>Number of Invoices</CardDescription>
					</CardHeader>
					<CardContent>
						<h2 className='text-2xl font-bold text-[#088395]'>
							{invoiceLength}
						</h2>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}