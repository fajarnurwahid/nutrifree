import { useState } from "react";
import Container from "../components/Container";
import MakroNutrienChart from "../components/home/MakroNutrienChart";
import ResultInfo from "../components/home/ResultInfo";

export type NutrienType = {
    protein: number;
    carbohydrate: number;
    fat: number;
};
export type TotalType = {
    age: number;
    weight: number;
    height: number;
    gender: string;
    activity: string;
};

const TOTAL: TotalType = {
    age: 0,
    weight: 0,
    height: 0,
    gender: "",
    activity: "",
};
const NUTREIN: NutrienType = {
    protein: 0,
    carbohydrate: 0,
    fat: 0,
};

export default function Home() {
    const [isResult, setIsResult] = useState(false);
    const [caloriTotal, setCaloriTotal] = useState(0);
    const [total, setTotal] = useState(TOTAL);
    const [nutrein, setNutrien] = useState(NUTREIN);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsResult(true);
        const formData = new FormData(e.currentTarget);
        let bmr;
        let calori;
        const age = Math.abs(Number(formData.get("age")));
        const weight = Math.abs(Number(formData.get("weight")));
        const height = Math.abs(Number(formData.get("height")));
        if (formData.get("gender") === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        switch (formData.get("activity")) {
            case "rare":
                calori = bmr * 1.2;
                break;
            case "light":
                calori = bmr * 1.375;
                break;
            case "medium":
                calori = bmr * 1.55;
                break;
            case "heavy":
                calori = bmr * 1.725;
                break;
            case "very-heavy":
                calori = bmr * 1.9;
                break;
            default:
                calori = 0;
                break;
        }
        calori = Math.round(calori);
        setCaloriTotal(calori);
        setTotal({
            age,
            weight,
            height,
            activity: formData.get("activity") as string,
            gender: formData.get("gender") as string,
        });
        setNutrien({
            protein: Number(((calori * 0.25) / 4).toFixed(1)),
            carbohydrate: Number(((calori * 0.5) / 4).toFixed(1)),
            fat: Number(((calori * 0.25) / 9).toFixed(1)),
        });
    }

    return (
        <>
            <section className="py-12 min-h-[calc(100vh-64px-58px)]">
                <Container>
                    {isResult ? (
                        <>
                            <div className="md:space-x-6 space-y-6 md:space-y-0 md:flex md:justify-center max-w-4xl mx-auto">
                                <div className="bg-white rounded-lg p-4 sm:p-8 border border-neutral-200 w-full">
                                    <p className="text-center text-xl font-medium mb-2 leading-tight">Angka Kecukupan Gizi Anda</p>
                                    <p className="text-center text-neutral-500 mb-8">
                                        Hasil ini dihitung dengan rumus <span className="font-semibold">Mifflin-St Jeor</span>
                                    </p>
                                    <p className="text-3xl font-bold text-center mb-1">
                                        <span className="inline-block py-1 px-3 rounded-md bg-orange-200 text-orange-500">{caloriTotal}</span>
                                    </p>
                                    <p className="text-center text-neutral-500 text-sm font-medium">kalori per hari</p>
                                    <ResultInfo total={total} />
                                </div>
                                <div className="bg-white rounded-lg p-4 sm:p-8 border border-neutral-200 w-full">
                                    <p className="text-center text-xl font-medium mb-8 leading-tight">Komposisi Gizi Harian Anda</p>
                                    <MakroNutrienChart data={nutrein} />
                                </div>
                            </div>
                            <div className="text-center mt-8">
                                <button type="button" onClick={() => setIsResult(false)} className="btn btn-primary">
                                    Cek Lagi
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-2 leading-tight">Kalkulator Nutrisi</h1>
                            <p className="text-neutral-500 text-center mb-8">Hitung nutrisimu cepat, simple, dan gratis!</p>
                            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                                <div>
                                    <label htmlFor="" className="form-label">
                                        Usia (tahun)
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        className="form-control w-full"
                                        defaultValue={total.age ? total.age : ""}
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className="form-label">
                                        Berat Badan (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        className="form-control w-full"
                                        defaultValue={total.weight ? total.weight : ""}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className="form-label">
                                        Tinggi Badan (cm)
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        className="form-control w-full"
                                        defaultValue={total.height ? total.height : ""}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className="form-label">
                                        Jenis Kelamin
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-full">
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value={"male"}
                                                className="form-radio-input"
                                                defaultChecked={total.gender ? total.gender === "male" : true}
                                            />
                                            <label htmlFor="male" className="form-radio-label w-full">
                                                Laki-laki
                                            </label>
                                        </div>
                                        <div className="w-full">
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value={"female"}
                                                className="form-radio-input"
                                                defaultChecked={total.gender === "female"}
                                            />
                                            <label htmlFor="female" className="form-radio-label w-full">
                                                Perempuan
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="form-label">
                                        Tingkat Aktivitas
                                    </label>
                                    <select className="form-control w-full" name="activity" defaultValue={total.activity ? total.activity : "light"}>
                                        <option value="rare">Jarang (tidak aktif)</option>
                                        <option value="light">Ringan (1-3 hari/minggu)</option>
                                        <option value="medium">Sedang (3-5 hari/minggu)</option>
                                        <option value="heavy">Berat (6-7 hari/minggu)</option>
                                        <option value="very-heavy">Sangat Berat (pekerjaan fisik berat)</option>
                                    </select>
                                </div>
                                <p className="text-sm text-neutral-500">
                                    <span className="text-red-500">*</span> AKG (Angka Kecukupan Gizi)
                                </p>
                                <div className="sm:flex sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                                    <button type="submit" className="btn btn-primary w-full">
                                        Cek AKG Saya
                                    </button>
                                    <button type="reset" onClick={() => setTotal(TOTAL)} className="btn btn-light w-full sm:w-auto">
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </Container>
            </section>
        </>
    );
}
