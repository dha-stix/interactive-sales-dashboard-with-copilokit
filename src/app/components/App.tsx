import { useState } from "react";
import ChartComponent from "@/app/components/Chart";
import CardComponent from "@/app/components/Card";
import TableComponent from "@/app/components/Table";
import CheckboxComponent from "@/app/components/Checkbox";
import Nav from "@/app/components/Nav";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

export default function App() {
	const [todoList, setTodoList] = useState<Todo[]>([
		{
			id: 1,
			text: "Learn about CopilotKit implementation",
			completed: false,
		},
		{
			id: 2,
			text: "Remind Uli about the next project",
			completed: false,
		},
		{
			id: 3,
			text: "Send an invoice to CopilotKit team",
			completed: false,
		},
	]);

	const [invoiceList, setInvoiceList] = useState<Invoice[]>([
		{
			id: 1,
			status: "Pending",
			amount: 1000,
			method: "Credit Card",
		},
		{
			id: 2,
			status: "Paid",
			amount: 2000,
			method: "Paypal",
		},
		{
			id: 3,
			status: "Overdue",
			amount: 3000,
			method: "Bank Transfer",
		},
	]);

	const [chartData, setChartData] = useState<Chart[]>([
		{ month: "January", sales: 350, customers: 80 },
		{ month: "February", sales: 200, customers: 30 },
		{ month: "March", sales: 1500, customers: 120 },
		{ month: "April", sales: 1050, customers: 190 },
		{ month: "May", sales: 1200, customers: 130 },
		{ month: "June", sales: 550, customers: 140 },
		{ month: "July", sales: 1200, customers: 130 },
	]);

	const calculateTotal = (key: keyof Chart): number => {
		if (key === "sales")
			return chartData.reduce((acc, item) => acc + item.sales, 0);
		return chartData.reduce((acc, item) => acc + item.customers, 0);
    };
    
    //👇🏻 pass Chart data to CopilotKit
	useCopilotReadable({
		description:
			"The chart data is a list of sales and customers data for each month. You can update the data for each month. It contains the month, sales, and customers data.",
		value: chartData,
	});

    //👇🏻 action to update chartData
	useCopilotAction({
		name: "updateChartData",
		description: "Update the chart data for the a particular month.",
		parameters: [
			{
				name: "month",
				type: "string",
				description: "The month to update the data for.",
				required: true,
			},
			{
				name: "sales",
				type: "number",
				description: "The sales data for the month.",
				required: true,
			},
			{
				name: "customers",
				type: "number",
				description: "The customers data for the month.",
				required: true,
			},
		],
        render: ({ status, args }) => {
            const { month, sales, customers } = args;
            if (month === undefined || sales === undefined || customers === undefined) return "";
            if (typeof month !== "string" || typeof sales !== "number" || typeof customers !== "number") return "";
            
            const updateChart = () => {
                setChartData((prev)  => {
                    return prev.map((item) => {
                        if (item.month === month) {
                            return { month, sales, customers };
                        }
                        return item;
                    });
                });
            };
            return (
                <div className="w-full p-2">
                    <p className="text-sm text-blue-400 mb-2">Status: {status}</p>
                    <ChartComponent chartData={[{month, sales, customers}]} />
                    <button className="px-4 py-2 bg-blue-400 text-white shadow rounded-md" onClick={updateChart}>Update</button>
                </div>
            )
        },
        handler: async ({ sales, customers, month }) => {
            // setChartData((prev) => {
            //     return prev.map((item) => { 
            //         if (item.month === month) {
            //             return { month, sales, customers };
            //         }
            //         return item;
            //     });
            // })
		},
    });
    
    //👇🏻 pass invoice data to CopilotKit
    useCopilotReadable({
		description: "The invoice list is a list of invoices that need to be paid. You can add, edit, and remove invoices from the list and also update the status of the invoice. An invoice status can either be Paid, Pending, or Overdue. The acceptable payment methods are Credit Card, Paypal, and Bank Transfer.",
		value: invoiceList,
	});

    //👇🏻 action to add new invoice
    useCopilotAction({
		name: "addNewInvoice",
		description: "Add new invoices to the invoice list",
            parameters: [
                {
                    name: "status",
                    type: "string",
                    description: "The status of the invoice.",
                    required: true,
                },
                {
                    name: "amount",
                    type: "number",
                    description: "The amount of the invoice.",
                    required: true,
                },
                {
                    name: "method",
                    type: "string",
                    description: "The payment method of the invoice.",
                    required: true,
                },
        ],
        render: ({ status: fetchStatus, args }) => {
            const { amount, method, status } = args;
            if (method !== "Credit Card" && method !== "Paypal" && method !== "Bank Transfer") return "";
            if (status !== "Paid" && status !== "Pending" && status !== "Overdue") return "";
            if (amount === undefined) return "";
            
            const addInvoice = () => {
                 setInvoiceList((prev ) => {
                    return [...prev, { id: prev.length + 1, status, amount, method }];
                });
            };
            return (
                <div className="w-full p-2">
                    <p className="text-sm text-blue-400 mb-2">Status: {fetchStatus}</p>
                    {status && amount !== undefined && method && <TableComponent invoiceList={[{ id: invoiceList.length + 1, status, amount, method }]} />}
                    <button className="px-4 py-2 bg-blue-400 text-white shadow rounded-md" onClick={addInvoice}>Add to Page</button>
                </div>
            )
         },
        handler: async ({ status, amount, method }) => {
            // if (method !== "Credit Card" && method !== "Paypal" && method !== "Bank Transfer") return;
            // if (status !== "Paid" && status !== "Pending" && status !== "Overdue") return;
            // setInvoiceList((prev) => {
            //     return [...prev, { id: prev.length + 1, status, amount, method }];
            //  })

		}
    })

    //👇🏻 action to delete invoices
    useCopilotAction({
		name: "deleteInvoice",
		description: "Remove invoices to the invoice list",
            parameters: [
                {
                    name: "id",
                    type: "number",
                    description: "The id of the invoice to remove.",
                    required: true,
                },
        ],
        render: ({ status, args }) => {
            const { id } = args;
            if (id === undefined) return "";
            const getInvoice = invoiceList.find((item) => item.id === id);
            if (!getInvoice) return ""

            const deleteInvoice = () => { 
                setInvoiceList((prev) => {
                    return prev.filter((item) => item.id !== id);
                });
            }
            
            return (
                <div className="w-full p-2">
                    <p className="text-sm text-blue-400 mb-2">Status: {status}</p>
                    <TableComponent invoiceList={[getInvoice]} />
                    <button className="px-4 py-2 bg-blue-400 text-white shadow rounded-md" onClick={deleteInvoice}>Delete</button>
                </div>
                
            )
        },
        handler: async ({ id }) => {
            // setInvoiceList((prev) => {
            //     return prev.filter((item) => item.id !== id);
            // })
        }
    })

    //👇🏻 pass todolist data to CopilotKit
    useCopilotReadable({
		description: "The todo list is a list of tasks that need to be completed. You can add, edit, and remove tasks from the list.",
		value: todoList,
    });
    
    //👇🏻 action to update todo status
    useCopilotAction({
        name: "toggleTodo",
        description: "Toggle the completion status of a todo item.",
        parameters: [
            {
                name: "id",
                type: "number",
                description: "The id of the todo item to toggle.",
                required: true,
            },
        ],
        render: ({ status, args }) => {
            const { id } = args;
            if (id === undefined) return "";
            const getTodo = todoList.find((item) => item.id === id);
            if (!getTodo) return "";

            const toggleTodo = () => {
                setTodoList(
                    todoList.map((todo) => {
                        if (todo.id === id) {
                            return { ...todo, completed: !todo.completed };
                        }
                        return todo;
                    })
                );
            };
            return (
                <div className="w-full p-2">
                    <p className="text-sm text-blue-400 mb-2">Status: {status}</p>
                    <CheckboxComponent todoList={[getTodo]} setTodoList={setTodoList} />
                    <button className="px-4 py-2 bg-blue-400 text-white shadow rounded-md" onClick={toggleTodo}>Toggle Todo</button>
                </div>
            )

        },
        handler: async ({ id }) => {
            // setTodoList(
            //     todoList.map((todo) => {
            //         if (todo.id === id) {
            //             return { ...todo, completed: !todo.completed };
            //         }
            //         return todo;
            //     })
            // );
        },
    })

    //👇🏻 action to add new todo
    useCopilotAction({
        name: "addNewTodo",
        description: "Add new todo to the todo list",
        parameters: [
            {
                name: "text",
                type: "string",
                description: "The text of the todo item.",
                required: true,
            },
        ],
        render: ({ status, args }) => {
            const { text } = args;
            if (text === undefined) return "";

            const addTodo = () => {
                setTodoList((prev) => {
                    return [...prev, { id: prev.length + 1, text, completed: false }];
                });
            };
            return (
                <div className="w-full p-2">
                    <p className="text-sm text-blue-400 mb-2">Status: {status}</p>
                    <CheckboxComponent todoList={[{ id: todoList.length + 1, text, completed: false }]} setTodoList={setTodoList} />
                    <button className="px-4 py-2 bg-blue-400 text-white shadow rounded-md" onClick={addTodo}>Add to Page</button>
                </div>
            )

        },
        handler: async ({ text }) => {
            // setTodoList((prev) => {
            //     return [...prev, { id: prev.length + 1, text, completed: false }];
            // });
        },
    });

    //👇🏻 action to delete todo
    useCopilotAction({
        name: "deleteTodo",
        description: "Remove todo from the todo list",
        parameters: [
            {
                name: "id",
                type: "number",
                description: "The id of the todo item to remove.",
                required: true,
            },
        ],
        render: ({ status, args }) => { 
            const { id } = args;
            if (id === undefined) return "";
            const getTodo = todoList.find((item) => item.id === id);
            if (!getTodo) return "";

            const deleteTodo = () => {
                setTodoList((prev) => {
                    return prev.filter((item) => item.id !== id);
                });
            };
            return (
                <div className="w-full p-2">
                    <p className="text-sm text-blue-400 mb-2">Status: {status}</p>
                    <CheckboxComponent todoList={[getTodo]} setTodoList={setTodoList} />
                    <button className="px-4 py-2 bg-red-500 text-white shadow rounded-md" onClick={deleteTodo}>Delete</button>
                </div>
            )
        },
        handler: async ({ id }) => {
            // setTodoList((prev) => {
            //     return prev.filter((item) => item.id !== id);
            // });
        },
    });

    return (
        <main>
			<Nav />
			<div className='w-full flex items-center justify-between p-4 md:flex-row space-x-4'>
				<div className='lg:w-1/2 h-[300px] lg:mb-0 mb-4 w-full'>
					<CardComponent
						invoiceLength={invoiceList.length}
						todoLength={todoList.length}
						totalCustomers={calculateTotal("customers")}
						totalSales={calculateTotal("sales")}
					/>
				</div>
				<div className='lg:w-1/2  h-[300px] w-full lg:mb-0 mb-4 '>
					<ChartComponent chartData={chartData} />
				</div>
			</div>
			<div className='w-full flex flex-row items-center justify-between lg:space-x-4 p-4'>
				<div className='lg:w-1/2 w-full h-full lg:mb-0 mb-8'>
					<TableComponent invoiceList={invoiceList} />
				</div>
				<div className='lg:w-1/2 w-full h-full lg:mb-0 mb-4'>
					<CheckboxComponent todoList={todoList} setTodoList={setTodoList} />
				</div>
			</div>
		</main>
	);
}