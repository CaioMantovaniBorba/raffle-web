import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AiOutlineWhatsApp, AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import api from '@/services/api';
import { RaffleType } from '@/types/RaffleType';

import raffleImage from '@/assets/foto1.jpg';

export default function ListRaffle() {
  const [raffle, setRaffle] = useState<RaffleType>();
  const [amount, setAmount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/raffles/raffle/${id}`)
      .then(response => {
        setRaffle(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleDecrement = () => {
    if (amount === 0) {
      return null;
    }
    setAmount(amount - 1);
  }

  return (
    <div className="background h-auto w-screen my-16 flex flex-col items-center justify-center">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="border bg-slate-900 rounded-md">
          <img
            src={raffleImage}
            className="rounded-md object-cover" />
          <div className="w-full flex-column items-start p-2">
            <h1 className="font-bold text-2xl my-2">{raffle?.title.toUpperCase()}</h1>
            <p className="text-md">0,03 CENTAVOS NO PACOTE PROMOCIONAL</p>
          </div>
        </div>

        <div className="flex items-center my-4">
          <p className="text-md mr-2">POR APENAS</p>
          <h1 className="font-bold text-xl text-green-600 bg-slate-100 p-2 rounded-md">R$ {raffle?.priceOfTicket.toFixed(2).replace('.', ',')}</h1>
        </div>

        <div className="flex items-center justify-between my-4 w-full">
          <div className="flex items-center">
            <p className="text-md mr-2">Sorteio</p>
            <h1 className="text-md text-black bg-slate-100 p-1 rounded-md">26/06/2024 às 16h30</h1>
          </div>

          <div className="flex space-x-2">
            <AiOutlineWhatsApp className="h-6 w-6 cursor-pointer opacity-50" />
            <AiOutlineTwitter className="h-6 w-6 cursor-pointer opacity-50" />
            <AiOutlineInstagram className="h-6 w-6 cursor-pointer opacity-50" />
            <AiOutlineFacebook className="h-6 w-6 cursor-pointer opacity-50" />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex items-start w-full mb-4">
          <p className="text-xl font-bold mr-1">📣 Promoção |</p>
          <p className="text-md">Compre mais barato!</p>
        </div>

        <div className="flex bg-slate-100 rounded-md w-full p-2 space-x-4">
          <div className="flex justify-center bg-green-600 w-1/4 rounded-md cursor-pointer">
            <p className="font-bold">300 por R$ 9,00</p>
          </div>
          <div className="flex justify-center items-center bg-green-600 w-1/4 rounded-md cursor-pointer">
            <p className="font-bold">500 por R$ 15,00</p>
          </div>
          <div className="flex justify-center items-center bg-green-600 w-1/4 rounded-md cursor-pointer">
            <p className="font-bold">1000 por R$ 30,00</p>
          </div>
          <div className="flex justify-center items-center bg-green-600 w-1/4 rounded-md cursor-pointer">
            <p className="font-bold">2000 por R$ 60,00</p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex items-start w-full mb-4">
          <p className="text-xl font-bold mr-1">⚡ Cotas |</p>
          <p className="text-md">Escolha sua sorte!</p>
        </div>
        <Button variant="outline" className="bg-slate-600 w-full mb-2">Ver meus números</Button>
        <div className="flex flex-col items-center justify-around bg-slate-900 w-full rounded-md p-16 space-y-8">
          <p className="text-md">Selecione a quantidade de números</p>
          <div className="justify-between grid grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="w-[220px] h-20 text-md" onClick={() => setAmount(amount + 250)}>+250</Button>
            <Button variant="outline" size="lg" className="w-[220px] h-20 text-md" onClick={() => setAmount(amount + 500)}>+500</Button>
            <Button variant="outline" size="lg" className="w-[220px] h-20 text-md" onClick={() => setAmount(amount + 1000)}>+1000</Button>
            <Button variant="outline" size="lg" className="w-[220px] h-20 text-md" onClick={() => setAmount(amount + 2000)}>+2000</Button>
          </div>
          <div className="flex items-center">
            <div>
              <Button variant="outline" size="lg" className="w-10 h-10 rounded-full mr-2 p-0" onClick={() => handleDecrement()}>-</Button>
            </div>
            <Input type="number" className="w-full h-14 px-16 text-center font-bold" value={amount} />
            <div>
              <Button variant="outline" size="lg" className="w-10 h-10 rounded-full ml-2 p-0" onClick={() => setAmount(amount + 1)}>+</Button>
            </div>
          </div>
        </div>
        <Button variant="outline" className="bg-green-600 w-full mt-2">Participar do sorteio</Button>

        <Separator className="my-8" />

        <div>
          <h1 className="font-bold text-center text-xl">DESCRIÇÃO</h1>
          <p className="my-2 text-md">PREMIAÇÃO: {raffle?.title.toUpperCase()}</p>
          <p className="my-2 text-md">APENAS 1 GANHADOR CONFORME DETALHADO NAS CONDIÇÕES DE PARTICIPAÇÃO.</p>
          <p className="my-2 text-md">Ao preencher a ficha de cadastro e realizar a contribuição única, o titular receberá 01 número da sorte, distinto dos demais, composto de 05 algarismos que será utilizado para concorrer a {raffle?.title} conforme a premiação indicada acima e no material de divulgação.</p>
          <p className="my-2 text-md">O sorteio será realizado assim que finalizar 100% dos títulos (Loteria Federal).</p>
          <p className="my-2 text-md">O resultado do sorteio e a identificação do contemplado serão amplamente divulgados neste site.</p>
          <p className="my-2 text-md">A combinação contemplada será composta pelos algarismos do Primeiro Prêmio da extração da Loteria Federal, adicionando-se ao seu final o primeiro e o segundo algarismo do Segundo Prêmio da Loteria Federal.</p>
        </div>

        <Separator className="my-8" />

        <span className="text-2xl mb-4 text-green-600">COMPRE E CONCORRA A</span>
        <span className="font-bold text-4xl mb-4">{raffle?.title.toUpperCase()}</span>
        <div className="w-[150px] h-0.5 bg-green-600"></div>
      </div>
    </div>
  )
}
