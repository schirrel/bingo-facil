"use client";
import { getBingo } from "@/firebase/bingo/read";
import { createCartela } from "@/firebase/cartela/create";
import { deleteCartela } from "@/firebase/cartela/delete";
import { getCartelas } from "@/firebase/cartela/read";
import { BingoModel } from "@/models/Bingo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/admin/loading";
import {
    WhatsappShareButton
} from 'next-share'

type Cartela = {
    id: string,
    items: string[],
    numero: number
}
export default function Page() {
    const params = useParams()
    const id = params.id as string;
    const [bingo, setBingo] = useState<Partial<BingoModel>>({});
    const [text, setText] = useState("");
    const [cartelas, setCartelas] = useState<Cartela[]>([]);
    const [loading, setLoading] = useState(false);
    const [csv, setCSV] = useState("");

    useEffect(() => {
        loadData()
    }, []);

    const converterCsv = async () => {
        setLoading(true);
        const lines = csv.split("\n");
        for (let idx = 0; idx < lines.length; idx++) {
            await saveItem(lines[idx], idx+1);
        }
        setCSV("");
        loadData();
    }

    const saveItem = async (value?: string, numero?: number) => {
        if (csv && (!text && !value)) {
            converterCsv();
            return;
        }
        setLoading(true);
        const str = text || value || '';
        const items = str.split(";").map(item => item.trim()).filter(Boolean);
        await createCartela(id, { items, numero: numero ?? cartelas.length + 1 });
        await loadData();
        setText("");
    };

    const loadData = async () => {
        setLoading(true);
        const response = await getBingo(id);
        if (response.result)
            setBingo(response.result)

        const cartelasData = await getCartelas(id);
        if (cartelasData.result) {
            setCartelas(cartelasData.result.sort((curr, next) => {
                return curr.numero - next.numero
            }))
        }

        setLoading(false);
    }
    const removeCartela = async (cartelaId: string) => {
        await deleteCartela(id, cartelaId);
        await loadData();
    }


    return (
        <div className="min-h-full">
            {loading ? <Loading /> : <></>}

            {bingo ? (
                <h2 className="p-4 text-3xl font-bold tracking-tight text-gray-900">
                    Bingo: {bingo.name}
                </h2>
            ) : (
                <h2>Bingo não encontrado.</h2>
            )}

            <div
                role="list"
                className="m-2 grid grid-cols-3 gap-4"
            >
                <div>
                    <h3>Cadastrar Cartela:</h3>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>



                    <h3>CSV</h3>
                    <textarea
                        onChange={(e) => setCSV(e.target.value)}
                        value={csv}
                        className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>

                    <small>
                        Separe os items da cartela com ponto-e-virgula (<strong className="font-bold">;</strong>)
                    </small>

                    <div className="items-end content-end self-end ml-auto col-span-2">
                        <button
                            onClick={() => saveItem()}
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"
                        >
                            Salvar
                        </button>
                    </div>
                </div>
                <div className="col-span-2">

                    <h3 className="p-4 text-2xl font-bold tracking-tight text-gray-900">Cartelas</h3>

                    {
                        cartelas.map((cartela, index) => {
                            return <div className="m-auto max-w-500px mb-4" key={index}>
                                <span className=" font-bold">#{cartela.numero}</span> | <button onClick={() => removeCartela(cartela.id)}
                                    className="rounded-full border border-solid border-gray-800 transition-colors  text-gray-800 font-bold text-xs m-2 p-1"
                                > Apagar </button> |
                                <WhatsappShareButton
                                    url={`https://bingo-facil.vercel.app/bingo/${id}/cartela/${cartela.numero}`}
                                    title={'Confira online sua cartela'}
                                    separator="    "
                                >
                                    <span className="rounded-full border border-solid border-transparent bg-gray-800 text-white transition-colors  text-gray-800 font-bold text-xs m-2 p-1">Compartilhar</span>
                                </WhatsappShareButton>
                                <div className="text-center m-auto grid grid-cols-5">
                                    {cartela.items.map((item) => {
                                        return <span className="border-gray-800 border-solid border text-xs font-bold tracking-tight text-gray-900" key={item}>{item}</span>
                                    })}
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    );
}
