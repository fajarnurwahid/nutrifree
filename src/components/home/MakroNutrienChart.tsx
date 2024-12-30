import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { type NutrienType } from "../../pages/Home";

type MakroNutrienChartProps = React.HTMLAttributes<HTMLCanvasElement> & {
    data: NutrienType;
};

const NUTREIN_TITLE: Record<keyof NutrienType, string> = {
    protein: "Protein",
    carbohydrate: "Karbohidrat",
    fat: "Lemak",
};

export default function MakroNutrienChart({ className, data }: MakroNutrienChartProps) {
    const canvasRef = useRef(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        if (canvasRef.current) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(canvasRef.current, {
                type: "pie",
                data: {
                    labels: Object.keys(data).map((key) => NUTREIN_TITLE[key as keyof NutrienType]),
                    datasets: [
                        {
                            data: Object.values(data),
                            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (ctx) {
                                    return `${ctx.formattedValue} gram`;
                                },
                            },
                        },
                    },
                },
            });
        }
    }, [canvasRef.current]);

    return (
        <div className={twMerge("h-80", className)}>
            <canvas ref={canvasRef} className="mx-auto"></canvas>
        </div>
    );
}
