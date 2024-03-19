import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import api from "@/services/api";

const FormSchema = z.object({
  title: z.string().min(6, {
    message: "Informe um título.",
  }),
  description: z.string().min(6, {
    message: "Informe uma descrição.",
  }),
  amountOfTickets: z.string().min(4, {
    message: "Informe a quantidade de bilhetes.",
  }),
  priceOfTicket: z.string({
    required_error: "Informe o valor de cada bilhete."
  }).min(1, {
    message: "Informe o valor de cada bilhete.",
  }),
  expectedDrawDate: z.date({
    required_error: "Informe a data do sorteio."
  })
})

export default function CreateRaffle() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      amountOfTickets: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newRaffle = {
      title: data.title,
      description: data.description,
      amountOfTickets: parseInt(data.amountOfTickets),
      priceOfTicket: parseFloat(data.priceOfTicket),
      expectedDrawDate: data.expectedDrawDate,
      active: true,
      image: "caio.png"
    };

    api.post("/raffles/createRaffle", newRaffle)
      .then(() => (
        navigate("/dashboard")
      ))
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="background h-screen w-screen flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 items-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="" max={12} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="" max={12} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amountOfTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de bilhetes</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000">10 mil</SelectItem>
                      <SelectItem value="100000">100 mil</SelectItem>
                      <SelectItem value="1000000">1 milhão</SelectItem>
                      <SelectItem value="10000000">10 milhões</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceOfTicket"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço de cada bilhete</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 1,50" max={12} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectedDrawDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data prevista do sorteio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={pt}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-center">
            <Button type="submit" className="w-1/3">Criar rifa</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
