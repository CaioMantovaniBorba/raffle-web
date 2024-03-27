import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { MdPix } from "react-icons/md";
import api from '@/services/api';

interface User {
  name: string;
}

export default function Checkout() {
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState(String);
  const [user, setUser] = useState<User>();
  const priceOfTicket = 1.50;

  const handleDecrement = () => {
    if (amount === 0) {
      return null;
    }
    setAmount(amount - 1);
  }

  console.log(phone);

  const handleSearchUser = () => {
    api.get(`/users/getUser/${phone}`)
      .then(response =>
        setUser(response.data)
      ).catch(error => {
        setUser(null);
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center background h-auto w-screen my-16">
      <div className="flex items-center justify-center bg-slate-900 h-[100px] w-screen py-4 mb-4">
        <div className="flex items-center w-2/3">
          <span className="text-white font-bold text-2xl">CHECK-OUT</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-2/3">
        <span className="font-bold text-3xl mb-4">Dados Pessoais</span>

        <div className="flex flex-col w-full items-start space-y-4 mb-4">
          <Label htmlFor="email" className="text-xl">CELULAR</Label>
          <div className="flex w-full space-x-4">
            <Input type="number" maxLength={11} placeholder="1499700-0000" className="w-1/3 h-14 text-md" onChange={(e) => setPhone(e.target.value)} />
            {user && <Input type="text" className="w-2/3 h-14 text-md" disabled value={user.name} />}
          </div>
          <Button onClick={() => handleSearchUser()}>PESQUISAR</Button>
        </div>

        <div className="flex items-center justify-around bg-slate-900 w-full rounded-md px-4 py-16 mb-8">
          <div className="w-1/3">
            <img src="https://picsum.photos/800/600?grayscale" className="rounded-md object-cover" />
          </div>
          <div className="flex flex-col w-2/3 max-w-sm items-start space-y-4">
            <span className="text-xl">IPHONE 15 PRO MAX</span>
            <div className="flex w-full justify-between">
              <span className="text-gray-400 font-bold text-xl">Valor</span>
              <span className="text-gray-400 font-bold text-xl">1,50</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="text-gray-400 font-bold text-xl">Quantidade</span>
              <span className="text-gray-400 font-bold text-xl">{amount}</span>
            </div>
            <Separator className="my-8" />
            <div className="flex w-full justify-between">
              <span className="text-gray-600 font-bold text-xl">Total</span>
              <span className="text-gray-600 font-bold text-xl">R$ {amount * priceOfTicket}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around bg-slate-900 w-full rounded-md px-4 py-16 space-y-8">
          <Button variant="outline" className="flex-col w-[120px] h-[120px]">
            <MdPix size={30} className="mb-2" />
            PIX
          </Button>

          <div>
            <div className="flex mb-8">
              <Button variant="outline" size="lg" className="w-1/3 h-14 text-md" onClick={() => handleDecrement()}>-</Button>
              <Input type="number" className="w-2/3 h-14 px-8 text-center text-md" value={amount} />
              <Button variant="outline" size="lg" className="w-1/3 h-14 text-md" onClick={() => setAmount(amount + 1)}>+</Button>
            </div>

            <div className="flex justify-between space-x-2">
              <Button variant="outline" size="lg" className="w-1/3 h-14 text-md" onClick={() => setAmount(amount + 10)}>+10</Button>
              <Button variant="outline" size="lg" className="w-1/3 h-14 text-md" onClick={() => setAmount(amount + 50)}>+50</Button>
              <Button variant="outline" size="lg" className="w-1/3 h-14 text-md" onClick={() => setAmount(amount + 100)}>+100</Button>
            </div>
          </div>

          <Button variant="outline" size="lg">GERAR PIX</Button>

          <span>Ao efetuar o pagamento você está concordando com os <a className="underline text-green-600">Termos e Condições de Uso.</a></span>
        </div>
      </div>
    </div>
  )
}
