import {
	BarElement,
	CategoryScale,
	Chart,
	Legend,
	LinearScale,
	Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type React from "react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

Chart.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	ChartDataLabels,
);

type PerformanceChartProps = {
	dataPoints: { strategy: string; time: number }[];
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ dataPoints }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkMode(matchMedia.matches);

		const handler = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches);
		};

		matchMedia.addEventListener("change", handler);

		return () => {
			matchMedia.removeEventListener("change", handler);
		};
	}, []);

	const backgroundColors = dataPoints.map((dp) => {
		switch (dp.strategy) {
			case "no-store":
				return "rgba(255, 99, 132, 0.5)";
			case "reload":
				return "rgba(54, 162, 235, 0.5)";
			case "force-cache":
				return "rgba(255, 206, 86, 0.5)";
			case "only-if-cached":
				return "rgba(75, 192, 192, 0.5)";
			default:
				return "rgba(153, 102, 255, 0.5)";
		}
	});

	const borderColors = dataPoints.map((dp) => {
		switch (dp.strategy) {
			case "no-store":
				return "rgba(255, 99, 132, 1)";
			case "reload":
				return "rgba(54, 162, 235, 1)";
			case "force-cache":
				return "rgba(255, 206, 86, 1)";
			case "only-if-cached":
				return "rgba(75, 192, 192, 1)";
			default:
				return "rgba(153, 102, 255, 1)";
		}
	});

	const data = {
		labels: dataPoints.map((dp) => dp.strategy),
		datasets: [
			{
				label: "Time Taken (ms)",
				data: dataPoints.map((dp) => dp.time),
				backgroundColor: backgroundColors,
				borderColor: borderColors,
				borderWidth: 1,
			},
		],
	};

	const textColor = isDarkMode ? "#fff" : "#000";
	const gridColor = isDarkMode ? "#555" : "#ccc";

	const options = {
		responsive: true,
		plugins: {
			datalabels: {
				color: textColor,
				anchor: "end",
				align: "start",
				formatter: (value: number) => value.toFixed(2),
			},
			legend: {
				labels: {
					color: textColor,
				},
			},
			tooltip: {
				callbacks: {
					label: (context: any) => {
						return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} ms`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					color: textColor,
				},
				grid: {
					color: gridColor,
				},
				title: {
					display: true,
					text: "Time Taken (ms)",
					color: textColor,
				},
			},
			x: {
				ticks: {
					color: textColor,
				},
				grid: {
					color: gridColor,
				},
				title: {
					display: true,
					text: "Cache Strategy",
					color: textColor,
				},
			},
		},
	};

	return <Bar data={data} options={options} />;
};

export default PerformanceChart;
