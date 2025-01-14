import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link className="text-sm" href="/">
      <span className="absolute rotate-180 -ml-4">→</span>
       Voltar
      </Link>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2 className="font-bold text-lg pt-4" id="cadastro">
          Cadastro
        </h2>
        <a className="" href="https://bingo-facil.vercel.app/signup">
          https://bingo-facil.vercel.app/signup
        </a>
        <p>somente necessário para criar um bingo</p>
        <h2 className="font-bold text-lg pt-4" id="login">
          Login
        </h2>
        <a className="" href="https://bingo-facil.vercel.app/signin">
          https://bingo-facil.vercel.app/signin
        </a>
        <p>somente necessário para criar um bingo</p>
        <h2 className="font-bold text-lg pt-4" id="criar-bingo">
          Criar Bingo
        </h2>
        <a className="" href="https://bingo-facil.vercel.app/admin">
          https://bingo-facil.vercel.app/admin
        </a>
        <h2 className="font-bold text-lg pt-4" id="meus-bingos">
          Meus Bingos
        </h2>
        <a className="" href="https://bingo-facil.vercel.app/admin/bingos">
          https://bingo-facil.vercel.app/admin/bingos
        </a>
        <h2 className="font-bold text-lg pt-4" id="cadastrar-item-do-bingo">
          Cadastrar Item do bingo
        </h2>{" "}
        <a
          className=""
          href="https://bingo-facil.vercel.app/admin/bingos/ID-DO-BINGO"
        >
          https://bingo-facil.vercel.app/admin/bingos/ID-DO-BINGO
        </a>
        <p className="mb-8">
          Pode ser cadastrado um ou mais items.
          <br />
          Para cadastrar mais de um item utilize <code>;</code> para separar.
          <br />
          Um item não pode ser editador, apenas apagado.
        </p>
        <h2 className="font-bold text-lg pt-4" id="-iniciar-lan-ar-bingo">
          &quot;Iniciar&quot; Lançar bingo
        </h2>{" "}
        <a
          className=""
          href="https://bingo-facil.vercel.app/admin/bingos/ID-DO-BINGO/iniciar"
        >
          https://bingo-facil.vercel.app/admin/bingos/ID-DO-BINGO/iniciar
        </a>
        <p className="mb-8">
          Tela usada pelo adminstrador do bingo para &quot;lançar&quot; os items
          que &quot;sairem&quot; no bingo.
        </p>
        <h2 className="font-bold text-lg pt-4" id="conferir-bingo">
          Conferir Bingo
        </h2>{" "}
        <a
          className=""
          href="https://bingo-facil.vercel.app/bingo/ID-DO-BINGO/conferir"
        >
          https://bingo-facil.vercel.app/bingo/ID-DO-BINGO/conferir
        </a>
        <p className="mb-8">
          Parte a ser usada pelos participantes do bingo, atualiza em tempo
          real, alguns segundos de atraso podem ocorrer
        </p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://schirre.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Desenvolvedor →
        </a>
        <a
          className=""
          href="https://www.flaticon.com/free-icons/bingo"
          title="bingo icons"
        >
          Bingo icons created by Smashicons - Flaticon
        </a>
      </footer>
    </div>
  );
}
