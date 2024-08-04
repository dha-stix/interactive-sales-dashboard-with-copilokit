interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
interface Invoice {
    id: number;
    status: "Paid" | "Pending" | "Overdue";
    amount: number;
    method: "Credit Card" | "Paypal" | "Bank Transfer";
}
interface Chart {
    month: string;
    sales: number;
    customers: number;
}