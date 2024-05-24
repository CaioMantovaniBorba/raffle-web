import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { MdPix } from "react-icons/md";
import axios from 'axios';

import api from '@/services/api';

import raffleImage from '@/assets/carro-moto.jpg';

interface User {
  name: string;
}

export default function Checkout() {
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState(String);
  const [name, setName] = useState(String);
  const [cpf, setCpf] = useState(String);
  const [email, setEmail] = useState(String);
  const [number, setNumber] = useState(String);
  const [cep, setCep] = useState(String);
  const [address, setAddress] = useState(String);
  const [errorMessage, setErrorMessage] = useState(String);
  const [user, setUser] = useState<User>();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [raffle, setRaffle] = useState();

  useEffect(() => {
    api.get(`/raffles/raffle/${6}`)
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

  useEffect(() => {
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => setAddress(response.data))
        .catch(error => console.log(error));
    }
  }, [cep]);

  return (
    <div className="flex flex-col items-center justify-center background h-auto w-screen my-16">
      <div className="flex items-center justify-center bg-slate-900 h-[100px] w-screen py-4 mb-4">
        <div className="flex items-center w-3/4">
          <span className="text-white font-bold text-2xl">CHECK-OUT</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-3/4 mb-8 space-y-4">
        <span className="font-bold text-3xl mb-4">Dados Pessoais</span>

        {/* SEÇÃO DE CADASTRO */}
        <div className="flex items-end w-full space-x-2">
          <div className='flex-col w-full space-y-2'>
            <Label htmlFor="phone" className="text-xl">CELULAR</Label>
            <Input id="phone" type="tel" maxLength={11} placeholder="(00) 00000-0000" className="h-14 text-md" onChange={(e) => setPhone(e.target.value)} />
          </div>
          {user && phone && <Input type="text" className="h-14 text-md" disabled value={user.name} />}
          {showRegisterForm && phone &&
            <>
              <div className='flex-col w-full'>
                <Label htmlFor="name" className="text-xl">NOME COMPLETO</Label>
                <Input id="name" type="" maxLength={64} placeholder="Seu nome" className="h-14 text-md" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='flex-col w-full'>
                <Label htmlFor="cpf" className="text-xl">CPF</Label>
                <Input id="cpf" type="text" maxLength={11} placeholder="000.000.000-00" className="h-14 text-md" onChange={(e) => setCpf(e.target.value)} />
              </div>
              <div className='flex-col w-full'>
                <Label htmlFor="email" className="text-xl">E-MAIL</Label>
                <Input id="email" type="email" placeholder="email@example.com" className="h-14 text-md" onChange={(e) => setEmail(e.target.value)} />
              </div>
            </>}
        </div>

        {showRegisterForm && phone &&
          <div className="flex w-full space-x-2">
            <div className='flex-col w-full'>
              <Label htmlFor="cep" className="text-xl">CEP</Label>
              <Input id="cep" type="text" maxLength={8} placeholder="Seu CEP" className="h-14 text-md" onChange={(e) => setCep(e.target.value)} />
            </div>
            <div className='flex-col w-full'>
              <Label htmlFor="logradouro" className="text-xl">LOGRADURO</Label>
              <Input id="logradouro" type="text" value={address.logradouro} readOnly contentEditable="false" className="h-14 text-md" />
            </div>
            <div className='flex-col w-[100px]'>
              <Label htmlFor="numero" className="text-xl">NÚMERO</Label>
              <Input id="numero" type="tel" maxLength={8} className="h-14 text-md" onChange={(e) => setNumber(e.target.value)} />
            </div>
            <div className='flex-col w-full'>
              <Label htmlFor="bairro" className="text-xl">BAIRRO</Label>
              <Input id="bairro" type="text" value={address.bairro} readOnly className="h-14 text-md" />
            </div>
            <div className='flex-col w-full'>
              <Label htmlFor="localidade" className="text-xl">LOCALIDADE</Label>
              <Input id="localidade" type="text" value={address.localidade} readOnly className="h-14 text-md" />
            </div>
          </div>
        }

        {errorMessage && <span className="text-red-600 font-bold text-sm mt-2">{errorMessage}</span>}

        {!showRegisterForm && <Button className="mt-4" onClick={() => handleSearchUser()}>PESQUISAR</Button>}
      </div>

      {/* SEÇÃO DE INFORMAÇÕES */}
      <div className="flex items-center justify-around bg-slate-900 w-full rounded-md px-4 py-16 mb-8">
        <div className="w-1/3">
          <img src={raffleImage} className="rounded-md object-cover" />
        </div>
        <div className="flex flex-col w-2/3 max-w-sm items-start space-y-4">
          <span className="text-xl">{raffle?.title.toUpperCase()}</span>
          <div className="flex w-full justify-between">
            <span className="text-gray-400 font-bold text-xl">Valor</span>
            <span className="text-gray-400 font-bold text-xl">{raffle?.priceOfTicket.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-gray-400 font-bold text-xl">Quantidade</span>
            <span className="text-gray-400 font-bold text-xl">{amount}</span>
          </div>
          <Separator className="my-8" />
          <div className="flex w-full justify-between">
            <span className="text-gray-600 font-bold text-xl">Total</span>
            <span className="text-gray-600 font-bold text-xl">R$ {amount * raffle?.priceOfTicket}</span>
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
