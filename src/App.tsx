import { useState } from "react";

function App() {
	const [posts, setPosts] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async (cacheStrategy: RequestCache) => {
		setLoading(true);
		const response = await fetch("http://localhost:3001/posts", {
			cache: cacheStrategy,
		});
		const data = await response.json();
		setPosts(data);
		setLoading(false);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Fetch API Cache Strategies</h1>
			<div className="my-4">
				<button
					className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
					onClick={() => fetchData("default")}
					type="button"
				>
					Default
				</button>
				<button
					className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
					onClick={() => fetchData("no-store")}
					type="button"
				>
					No-Store
				</button>
				<button
					className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
					onClick={() => fetchData("reload")}
					type="button"
				>
					Reload
				</button>
				<button
					className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
					onClick={() => fetchData("force-cache")}
					type="button"
				>
					Force-Cache
				</button>
				<button
					className="px-4 py-2 bg-purple-500 text-white rounded"
					onClick={() => fetchData("only-if-cached")}
					type="button"
				>
					Only-If-Cached
				</button>
			</div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{posts.map((post) => (
						<li key={post.id} className="border-b py-2">
							<h2 className="text-xl">{post.title}</h2>
							<p>{post.content}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
