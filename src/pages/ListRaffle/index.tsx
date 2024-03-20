import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BoxIcon } from "@radix-ui/react-icons";

export default function ListRaffle() {
  return (
    <div className="background h-auto w-screen my-16 flex flex-col items-center justify-center">
      <div className="w-2/3 flex flex-col items-center justify-center">
        <img src="https://picsum.photos/800/600?grayscale" className="rounded-md object-cover" />
        <div className="w-full flex-column items-start">
          <h1 className="font-bold text-4xl my-4">IPHONE 15 PRO MAX</h1>
          <h1 className="font-bold text-4xl mb-8 text-green-600">R$ 1,50</h1>
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit" className="w-1/3 text-xl">COMPRAR AGORA</Button>
        </div>

        <Separator className="my-8" />

        <div>
          <h1 className="font-bold text-center text-xl">DESCRIÇÃO</h1>
          <p className="my-2 text-md">PREMIAÇÃO: IPHONE 15 PRO MAX</p>
          <p className="my-2 text-md">APENAS 1 GANHADOR CONFORME DETALHADO NAS CONDIÇÕES DE PARTICIPAÇÃO.</p>
          <p className="my-2 text-md">Ao preencher a ficha de cadastro e realizar a contribuição única, o titular receberá 01 número da sorte, distinto dos demais, composto de 07 algarismos que será utilizado para concorrer a ... conforme a premiação indicada acima e no material de divulgação.</p>
          <p className="my-2 text-md">O sorteio será realizado as sim que finalizar 100% dos títulos (Loteria Federal)</p>
          <p className="my-2 text-md">O resultado do sorteio e a identificação do contemplado serão amplamente divulgados neste site.</p>
          <p className="my-2 text-md">A combinação contemplada será composta pelos algarismos do Primeiro Prêmio da extração da Loteria Federal, adicionando-se ao seu final o primeiro e o segundo algarismo do Segundo Prêmio da Loteria Federal.</p>
        </div>

        <Separator className="my-8" />

        <div>
          <h1 className="font-bold text-center text-xl mb-4">COMPARTILHE</h1>
          <div className="flex items-center">
            <BoxIcon className="h-4 w-4 cursor-pointer opacity-50" />
            <BoxIcon className="ml-auto h-4 w-4 cursor-pointer opacity-50" />
            <BoxIcon className="ml-auto h-4 w-4 cursor-pointer opacity-50" />
            <BoxIcon className="ml-auto h-4 w-4 cursor-pointer opacity-50" />
          </div>
        </div>

        <Separator className="my-8" />

        <span className="text-2xl mb-4 text-green-600">COMPRE E CONCORRA A</span>
        <span className="font-bold text-4xl mb-4">IPHONE 15 PRO MAX</span>
        <div className="w-[150px] h-0.5 bg-green-600"></div>
      </div>
    </div>
  )
}
