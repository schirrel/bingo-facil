"use client";

import AdminHeader from "@/components/admin/header";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getBingos } from "@/firebase/bingo/read";

export default async function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  if (!user) {
    router.push("/");
  } else {
  }
  const items = await getBingos((user as any).uid || "");
  return (
    <div className="min-h-full">
      <AdminHeader />
      <div className="grid grid-cols-3 gap-4 place-content-center">
        <div className="col-span-2">
          <ul role="list" className="m-10 divide-y divide-gray-100">
            {items.result &&
              items.result.map((item) => {
                return <span> {item.value} </span>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
