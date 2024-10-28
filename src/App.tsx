import { useState } from "react";
import PerformanceChart from "./components/PerformanceChart";
type Post = {
	id: number;
	title: string;
	content: string;
};

function App() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [timeTaken, setTimeTaken] = useState<number>(0);
	const [cacheStrategy, setCacheStrategy] = useState<RequestCache>("default");
	const [dataPoints, setDataPoints] = useState<
		{ strategy: string; time: number }[]
	>([]);

	const fetchData = async () => {
		setLoading(true);
		const startTime = performance.now();
		try {
			const response = await fetch("http://localhost:3001/posts", {
				cache: cacheStrategy,
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			const endTime = performance.now();
			const timeTaken = endTime - startTime;
			setTimeTaken(timeTaken);
			setPosts(data);
			setDataPoints([
				...dataPoints,
				{ strategy: cacheStrategy, time: timeTaken },
			]);
		} catch (error) {
			console.error("Fetch error:", error);
			setPosts([]);
			setTimeTaken(0);
		}
		setLoading(false);
	};

	const handleCacheStrategyChange = (strategy: RequestCache) => {
		setCacheStrategy(strategy);
		setPosts([]);
		setTimeTaken(0);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Fetch API Cache Strategies</h1>
			<p className="my-2">キャッシュ戦略を選択して、データを取得します。</p>
			<div className="my-4">
				{["default", "no-store", "reload", "force-cache", "only-if-cached"].map(
					(strategy) => (
						<button
							key={strategy}
							className={`mr-2 px-4 py-2 text-white rounded ${
								cacheStrategy === strategy ? "bg-blue-700" : "bg-blue-500"
							}`}
							onClick={() =>
								handleCacheStrategyChange(strategy as RequestCache)
							}
							type="button"
						>
							{strategy}
						</button>
					),
				)}
			</div>
			<button
				className="px-4 py-2 bg-green-500 text-white rounded"
				onClick={fetchData}
				disabled={loading}
				type="button"
			>
				Fetch Data
			</button>
			{loading ? (
				<p>Loading...</p>
			) : timeTaken > 0 ? (
				<>
					<p>Time taken: {timeTaken.toFixed(2)} ms</p>
					<p>Number of posts: {posts.length}</p>
				</>
			) : null}
			{dataPoints.length > 0 && <PerformanceChart dataPoints={dataPoints} />}
		</div>
	);
}

export default App;
