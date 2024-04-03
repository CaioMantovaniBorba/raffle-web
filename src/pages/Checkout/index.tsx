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
  const [errorMessage, setErrorMessage] = useState(String);
  const [user, setUser] = useState<User>();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const priceOfTicket = 1.50;

  const handleDecrement = () => {
    if (amount === 0) {
      return null;
    }
    setAmount(amount - 1);
  }

  const handleSearchUser = () => {
    if (phone.length === 0) {
      return setErrorMessage('Insira seu número de celular.')
    }
    api.get(`/users/getUser/${phone}`)
      .then(response => {
        setUser(response.data);
        setErrorMessage("");
      }
      ).catch(error => {
        setUser(null);
        setShowRegisterForm(true);
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center background h-auto w-screen my-16">
      <div className="flex items-center justify-center bg-slate-900 h-[100px] w-screen py-4 mb-4">
        <div className="flex items-center w-3/4">
          <span className="text-white font-bold text-2xl">CHECK-OUT</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-3/4 mb-8">
        <span className="font-bold text-3xl mb-4">Dados Pessoais</span>

        {/* SEÇÃO DE CADASTRO */}
        <div className="flex items-end w-full space-x-2">
          <div className='flex-col space-y-2'>
            <Label htmlFor="phone" className="w-1/4 text-xl">CELULAR</Label>
            <Input id="phone" type="tel" maxLength={11} placeholder="(00) 00000-0000" className="h-14 text-md" onChange={(e) => setPhone(e.target.value)} />
          </div>
          {user && phone && <Input type="text" className="h-14 text-md" disabled value={user.name} />}

          {showRegisterForm &&
            <>
              <div className='flex-col'>
                <Label htmlFor="name" className="text-xl">NOME COMPLETO</Label>
                <Input id="name" type="text" maxLength={11} placeholder="Seu nome" className="h-14 text-md" onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className='flex-col'>
                <Label htmlFor="cpf" className="text-xl">CPF</Label>
                <Input id="cpf" type="text" maxLength={11} placeholder="000.000.000-84" className="h-14 text-md" onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className='flex-col'>
                <Label htmlFor="email" className="text-xl">E-MAIL</Label>
                <Input id="" type="email" maxLength={11} placeholder="email@example.com" className="h-14 text-md" onChange={(e) => setPhone(e.target.value)} />
              </div>
            </>
          }
        </div>

        {errorMessage && <span className="text-red-600 font-bold text-sm mt-2">{errorMessage}</span>}

        <Button className="mt-4" onClick={() => handleSearchUser()}>PESQUISAR</Button>
      </div>

      {/* SEÇÃO DE INFORMAÇÕES */}
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

      {/* SEÇÃO DE PAGAMENTO */}
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
  )
}
