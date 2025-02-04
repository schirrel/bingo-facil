import AdminHeader from "@/components/admin/header";
import Item from "@/components/admin/Items";
import NovoItem from "@/components/admin/NovoItem";
import { getBingo, getBingoItems } from "@/firebase/bingo/read";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const response = await getBingo(id);
    const bingo = response.error ? null : response.result;

    const items = await getBingoItems(id);
    return (
        <div className="min-h-full">
            <AdminHeader />
            {bingo ? (
                <h2 className="p-4 text-3xl font-bold tracking-tight text-gray-900">
                    Bingo: {bingo.name}
                </h2>
            ) : (
                <h2>Bingo não encontrado.</h2>
            )}
            <div className="grid grid-cols-1 p-2 md:grid-cols-3 gap-4 place-content-center">
                <div>
                    <NovoItem id={id} />

                    <div className="flex gap-2">
                        <Link
                            href={`/admin/bingos/${id}/iniciar`}
                            className="rounded-full border border-solid border-transparent  text-center transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm p-1"
                        >
                            Tela de lançamento
                        </Link>

                        <Link
                            href={`/bingo/${id}/conferir`}
                            className="rounded-full border border-solid border-transparent  text-center transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm p-1"
                        >
                            Tela de Conferência
                        </Link>


                        <Link
                            href={`/bingo/${id}/qrcode`}
                            className="rounded-full border border-solid border-transparent  text-center transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm p-1"
                        >
                           QRCODE
                        </Link>
                        {/* <Link
                            href={`/admin/bingos/${id}/cartelas/gerar`}
                            className="rounded-full border border-solid border-transparent  text-center transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm p-1"
                        >
                            ?
                        </Link> */}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <ul role="list" className="m-10 divide-y divide-gray-100">
                        {items.result &&
                            items.result.map((item) => {
                                return <Item key={item.id} item={item} bingoId={id} />;
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
