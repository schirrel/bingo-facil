"use client";

import useScreenOrientation from "@/hooks/useScreenOrientation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams()
    // const slug = params.slug as string;
    const id = params.id as string;
    const [cartela, setCartela] = useState<string[]>([]);
    const screenOrientation = useScreenOrientation();
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        loadCartela();
        loadState();
    }, []);

    useEffect(() => {
        if (selected.length) {
            window.localStorage.setItem("selected", JSON.stringify(selected));
        }
    }, [selected]);

    const updateSelected = (index: number) => {
        if (isSelected(index)) {
            setSelected([
                ...selected.filter(i => i !== index),

            ]);
        } else {
            setSelected([
                ...selected,
                index
            ]);
        }
    }

    const loadState = () => {
        const sessionData = localStorage.getItem("selected");
        if (sessionData) {
            setSelected(JSON.parse(sessionData))
        }
    }

    const isSelected = (index: number) => selected.includes(index);

    const loadCartela = () => {
        const postData = async () => {
            const response = await fetch("/api/cartela?number=" + id);
            return response.json();
        };
        postData().then((data) => {
            setCartela(data.cartela);
        });
    }

    return (
        <div className="min-h-full text-center m-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Cartela #{id}</h2>
            {screenOrientation === 'portrait-primary' ? <h3 className="text-4xl p-10 font-bold tracking-tight text-gray-900"> Gire seu Telefone </h3> :
                <div className="text-center m-auto grid grid-cols-5 max-w-90vw">
                    <div className="border-red-800 border-solid border text-2xl font-bold tracking-tight text-gray-900">B</div>
                    <div className="border-red-800 border-solid border text-2xl font-bold tracking-tight text-gray-900">I</div>
                    <div className="border-red-800 border-solid border text-2xl font-bold tracking-tight text-gray-900">N</div>
                    <div className="border-red-800 border-solid border text-2xl font-bold tracking-tight text-gray-900">G</div>
                    <div className="border-red-800 border-solid border text-2xl font-bold tracking-tight text-gray-900">O</div>
                    {cartela && cartela.map((item: string, index: number) => {
                        return <div onClick={() => updateSelected(index)} className={`p-4 whitespace-break-spaces break-words border-red-800 border-solid border items-center justify-center flex ${isSelected(index) ? 'bg-red-800 text-white' : ''}`} key={item}>
                            <span>{item}</span></div>
                    })
                    }
                </div>
            }
        </div>
    );
}
