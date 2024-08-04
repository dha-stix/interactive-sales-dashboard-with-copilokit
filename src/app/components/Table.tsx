import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

export default function TableComponent({
	invoiceList,
}: {
	invoiceList: Invoice[];
	}) {

	return (
		<div>
			<h3 className='font-bold text-xl mb-3 text-[#071952]'>Invoices</h3>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Method</TableHead>
						<TableHead className='text-right'>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoiceList.map((invoice) => (
						<TableRow key={invoice.id}>
							<TableCell className='font-medium'>INV00{invoice.id}</TableCell>
							<TableCell
								className={`text-blue-400 ${
									invoice.status === "Overdue" && "text-red-500"
								} ${invoice.status === "Pending" && "text-orange-300"} `}
							>
								{invoice.status}
							</TableCell>
							<TableCell>{invoice.method}</TableCell>
							<TableCell className='text-right'>
								{formatCurrency(invoice.amount)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}