import { useState } from "react";
import Container from "../components/Container";

const TOTAL = {
    usia: 0,
    berat: 0,
    tinggi: 0,
    gender: "",
    aktivitas: "",
};

export default function Home() {
    const [isResult, setIsResult] = useState(false);
    const [kaloriTotal, setKaloriTotal] = useState(0);
    const [total, setTotal] = useState(TOTAL);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsResult(true);
        const formData = new FormData(e.currentTarget);
        let bmr;
        let kalori;
        const usia = Math.abs(Number(formData.get("usia")));
        const berat = Math.abs(Number(formData.get("berat")));
        const tinggi = Math.abs(Number(formData.get("tinggi")));
        if (formData.get("gender") === "laki-laki") {
            bmr = 10 * berat + 6.25 * tinggi - 5 * usia + 5;
        } else {
            bmr = 10 * berat + 6.25 * tinggi - 5 * usia - 161;
        }
        switch (formData.get("aktivitas")) {
            case "jarang":
                kalori = bmr * 1.2;
                break;
            case "ringan":
                kalori = bmr * 1.375;
                break;
            case "sedang":
                kalori = bmr * 1.55;
                break;
            case "berat":
                kalori = bmr * 1.725;
                break;
            case "sangat-berat":
                kalori = bmr * 1.9;
                break;
            default:
                kalori = 0;
                break;
        }
        setKaloriTotal(Math.round(kalori));
        setTotal({
            usia,
            berat,
            tinggi,
            aktivitas: formData.get("aktivitas") as string,
            gender: formData.get("gender") as string,
        });
    }

    return (
        <>
            <section className="py-12 min-h-[calc(100vh-64px-58px)]">
                <Container>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-2 leading-tight">Kalkulator Nutrisi</h1>
                    <p className="text-neutral-500 text-center mb-8">Hitung nutrisimu cepat, simple, dan gratis!</p>
                    {isResult ? (
                        <div className="bg-white rounded-lg p-4 sm:p-8 border border-neutral-200 max-w-lg mx-auto">
                            <p className="text-center text-xl font-medium mb-2 leading-tight">Angka Kecukupan Gizi Anda</p>
                            <p className="text-center text-neutral-500 mb-8">
                                Hasil ini dihitung dengan rumus <span className="font-semibold">Mifflin-St Jeor</span>
                            </p>
                            <p className="text-3xl font-bold text-center mb-1">
                                <span className="inline-block py-1 px-3 rounded-md bg-orange-200 text-orange-500">{kaloriTotal}</span>
                            </p>
                            <p className="text-center text-neutral-500 text-sm font-medium">kalori per hari</p>
                            <div className="mt-8 divide-y divide-neutral-200 border border-neutral-200 rounded-lg overflow-x-auto">
                                <div className="flex items-center justify-between">
                                    <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Usia</p>
                                    <p className="py-2 px-4 text-sm w-full text-right">{total.usia} tahun</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Berat Badan</p>
                                    <p className="py-2 px-4 text-sm w-full text-right">{total.berat} kg</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Tinggi Badan</p>
                                    <p className="py-2 px-4 text-sm w-full text-right">{total.tinggi} cm</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Jenis Kelamin</p>
                                    <p className="py-2 px-4 text-sm w-full text-right">{total.gender}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Tingkat Aktivitas</p>
                                    <p className="py-2 px-4 text-sm w-full text-right">{total.aktivitas}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-8">
                                <button type="button" onClick={() => setIsResult(false)} className="btn btn-primary">
                                    Cek Lagi
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                            <div>
                                <label htmlFor="" className="form-label">
                                    Usia (tahun)
                                </label>
                                <input
                                    type="number"
                                    name="usia"
                                    className="form-control w-full"
                                    defaultValue={total.usia ? total.usia : ""}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Berat Badan (kg)
                                </label>
                                <input type="number" name="berat" className="form-control w-full" defaultValue={total.berat ? total.berat : ""} required />
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Tinggi Badan (cm)
                                </label>
                                <input type="number" name="tinggi" className="form-control w-full" defaultValue={total.tinggi ? total.tinggi : ""} required />
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Jenis Kelamin
                                </label>
                                <div className="flex items-center space-x-4">
                                    <div className="w-full">
                                        <input
                                            type="radio"
                                            id="laki-laki"
                                            name="gender"
                                            value={"laki-laki"}
                                            className="form-radio-input"
                                            defaultChecked={total.gender ? total.gender === "laki-laki" : true}
                                        />
                                        <label htmlFor="laki-laki" className="form-radio-label w-full">
                                            Laki-laki
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="radio"
                                            id="perempuan"
                                            name="gender"
                                            value={"perempuan"}
                                            className="form-radio-input"
                                            defaultChecked={total.gender === "perempuan"}
                                        />
                                        <label htmlFor="perempuan" className="form-radio-label w-full">
                                            Perempuan
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Tingkat Aktivitas
                                </label>
                                <select className="form-control w-full" name="aktivitas" defaultValue={total.aktivitas ? total.aktivitas : "ringan"}>
                                    <option value="jarang">Jarang (tidak aktif)</option>
                                    <option value="ringan">Ringan (1-3 hari/minggu)</option>
                                    <option value="sedang">Sedang (3-5 hari/minggu)</option>
                                    <option value="berat">Berat (6-7 hari/minggu)</option>
                                    <option value="sangat-berat">Sangat Berat (pekerjaan fisik berat)</option>
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
                    )}
                </Container>
            </section>
        </>
    );
}
