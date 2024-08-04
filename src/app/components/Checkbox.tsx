"use client";
import { Checkbox } from "@/components/ui/checkbox";
interface Props {
	todoList: Todo[];
	setTodoList: (todoList: Todo[]) => void;
}

export default function CheckboxComponent({ todoList, setTodoList }: Props) {
	const toggleTodo = (id: number) => {
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
		<div className='flex flex-col space-y-4 p-3'>
			<h3 className='font-bold text-xl mb-3 text-[#071952]'>Pending Tasks</h3>

			{todoList.map((todo) => (
				<div className='items-top flex space-x-2' key={todo.id}>
					<Checkbox
						id={`todo-${todo.id}`}
						checked={todo.completed}
						onCheckedChange={() => toggleTodo(todo.id)}
					/>

					<div className='grid gap-1.5 leading-none'>
						<label
							htmlFor={`todo-${todo.id}`}
							className={`text-sm ${
								todo.completed && "line-through"
							} text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
						>
							{todo.text}
						</label>
					</div>
				</div>
			))}
		</div>
	);
}