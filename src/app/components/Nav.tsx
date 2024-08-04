export default function Nav() {
	return (
		<nav className='px-4 py-3 bg-blue-50 h-[10vh] flex items-center justify-between'>
			<h3 className='font-bold text-xl'>Dashboard</h3>
			<button className='px-4 py-2 bg-red-500 text-red-50 rounded-md'>
				Sign Out
			</button>
		</nav>
	);
}