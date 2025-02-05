"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/admin/loading";

export default function Page() {
    const [text, setText] = useState("");
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const slug = params.slug as string;

    const goToCartela = () => {
        setLoading(true);
        const link = `https://bingo-facil.vercel.app/bingo/${slug}/cartela/${text}`;
        return router.push(link);
    };

    return (
        <div className="min-h-full flex flex-col justify-center place-items-center text-center m-auto gap-4">
            {loading ? <Loading /> : <></>}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Número da sua cartela</h2>
            <input
                type="number"
                onChange={(e) => setText(e.target.value)}
                name="numero"
                id="numero"
                autoComplete="numero"
                required
                className="rounded-md bg-white px-3 py-1.5 text-3xl text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button
                type="button"
                onClick={() => goToCartela()}
                className="flex justify-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
                Ver Cartela
            </button>
        </div>
    );
}
