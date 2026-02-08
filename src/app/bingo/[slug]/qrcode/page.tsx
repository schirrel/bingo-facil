"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import Loading from "@/components/admin/loading";
import { getBingo } from "@/firebase/bingo/read";
import { BingoModel } from "@/models/Bingo";

export default function Page() {

    const params = useParams()
    const slug = params.slug as string;
    const [bingoId, setBingoId] = useState("");
    const [bingo, setBingo] = useState<Partial<BingoModel>>({});
    const [qrCodeConferencia, setQrCodeConferencia] = useState('');
    const [qrCodeCartela, setQrCodeCartela] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingCode, setLoadingCode] = useState(true);

    useEffect(() => {
        if (slug) {
            setBingoId(slug as string);
            loadBingo(slug as string);
        }
    }, []);

    const loadBingo = async (slug: string) => {
        const bingoRes = await getBingo(bingoId || slug);
        setBingo(bingoRes.result || {});
        setLoading(false);
        const urlConferencia = `https://bingo-facil.vercel.app/bingo/${slug}/conferir`;
        const urlCartela = `https://bingo-facil.vercel.app/bingo/${slug}/cartelas`;

        const generatedQRCode = await QRCode.toDataURL(urlConferencia);
        setQrCodeConferencia(generatedQRCode)
        const generatedqrCodeCartela = await QRCode.toDataURL(urlCartela);
        setQrCodeCartela(generatedqrCodeCartela)
        setLoadingCode(false);
    };

    return (
        <div className="min-h-full text-center m-auto">
            {loading || loadingCode ? <Loading /> : <></>}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Bingo: {bingo.name}
            </h2>
            <div className="grid grid-cols-2">
                <div>
                    Cartela Virtual
                    {qrCodeCartela && <img className="m-auto" src={qrCodeCartela} style={{ height: "100vh"}} />}
                     <button
                        onClick={() => {
                            const url = `https://bingo-facil.vercel.app/bingo/${slug}/cartela`;
                            navigator.clipboard.writeText(url);
                            alert('Link copied to clipboard!');
                        }}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Copy Link
                    </button>
                </div>
            </div>
        </div>
    );
}
