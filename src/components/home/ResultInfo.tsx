import { useState } from "react";
import { type TotalType } from "../../pages/Home";

type ResultInfoProps = {
    total: TotalType;
};

const GENDER = {
    male: "Laki-laki",
    female: "Perempuan",
};
const ACTIVITY = {
    rare: "Jarang",
    light: "Ringan",
    medium: "Sedang",
    heavy: "Berat",
    "very-heavy": "Sangat Berat",
};

export default function ResultInfo({ total }: ResultInfoProps) {
    const [isOpen, setIsOpen] = useState(false);

    return isOpen ? (
        <div className="mt-8 divide-y divide-neutral-200 border border-neutral-200 rounded-lg overflow-x-auto">
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Usia</p>
                <p className="py-2 px-4 text-sm w-full text-right">{total.age} tahun</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Berat Badan</p>
                <p className="py-2 px-4 text-sm w-full text-right">{total.weight} kg</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Tinggi Badan</p>
                <p className="py-2 px-4 text-sm w-full text-right">{total.height} cm</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Jenis Kelamin</p>
                <p className="py-2 px-4 text-sm w-full text-right">{GENDER[total.gender as keyof typeof GENDER]}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Tingkat Aktivitas</p>
                <p className="py-2 px-4 text-sm w-full text-right">{ACTIVITY[total.activity as keyof typeof ACTIVITY]}</p>
            </div>
        </div>
    ) : (
        <div className="mt-8 text-center">
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center space-x-1 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
                <span>Lihat lebih</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
            </button>
        </div>
    );
}
