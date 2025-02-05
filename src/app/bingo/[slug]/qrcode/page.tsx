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
    const [qrCode, setQrCode] = useState('');
    const urlConferencia = `https://bingo-facil.vercel.app/bingo/${slug}/conferir`;
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

        const generatedQRCode = await QRCode.toDataURL(urlConferencia);
        setQrCode(generatedQRCode)
        setLoadingCode(false);
    };

    return (
        <div className="min-h-full text-center m-auto">
            {loading || loadingCode ? <Loading /> : <></>}
            <h2 className="p-4 text-3xl font-bold tracking-tight text-gray-900">
                Bingo: {bingo.name}
            </h2>
            {qrCode && <img className="m-auto" src={qrCode} width="600px" />}
        </div>
    );
}
