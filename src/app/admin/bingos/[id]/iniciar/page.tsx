import AdminHeader from "@/components/admin/header";
import BingoItem from "@/components/BingoItem";
import { getBingo, getBingoItems } from "@/firebase/bingo/read";

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

      <div
        role="list"
        className="m-10 grid grid-cols-4 gap-4 place-items-center"
      >
        {items.result &&
          items.result.map((item) => {
            return <BingoItem item={item} key={item.id}/>;
          })}
      </div>
    </div>
  );
}
