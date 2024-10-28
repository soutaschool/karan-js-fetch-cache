import {
	CategoryScale,
	Chart,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Tooltip,
} from "chart.js";
import type React from "react";
import { Line } from "react-chartjs-2";

Chart.register(
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
	Legend,
);

type PerformanceChartProps = {
	dataPoints: { strategy: string; time: number }[];
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ dataPoints }) => {
	const data = {
		labels: dataPoints.map((dp) => dp.strategy),
		datasets: [
			{
				label: "Time Taken (ms)",
				data: dataPoints.map((dp) => dp.time),
				borderColor: "rgba(75,192,192,1)",
				fill: false,
			},
		],
	};

	return <Line data={data} />;
};

export default PerformanceChart;
