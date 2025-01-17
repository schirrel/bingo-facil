"use client";
import React, { FormEvent, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createNewBingo } from "@/firebase/bingo/create";
import Loading from "@/components/admin/loading";
import AdminHeader from "@/components/admin/header";
function Page() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [value, setValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleForm = async (event: FormEvent) => {
        setLoading(true);
        event.preventDefault();
        const result = await createNewBingo(value, user);
        if (!result.error && result.result) {
            router.push("/admin/bingos/" + result.result.id);
        }
        if (result.error) {
            console.error(result.error);
            return alert("Ocorreu um problema ao criar bingo.");
        }
        setLoading(false);
    };
    useEffect(() => {
        if (user == null) router.push("/");
    }, [user]);

    return (
        <div className="min-h-full">
            {loading ? <Loading /> : <></>}
            <AdminHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Bingo Fácil
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleForm}
                        className="space-y-6"
                        action="#"
                        method="POST"
                    >
                        <div>
                            <label
                                htmlFor="id"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Nome do bingo
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    onChange={(e) => setValue(e.target.value)}
                                    name="id"
                                    id="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex m-auto w-auto justify-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        >
                            Salvar
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Page;
