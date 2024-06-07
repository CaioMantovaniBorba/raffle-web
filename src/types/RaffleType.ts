export type RaffleType = {
  id: number;
	title: string;
	description: string;
	amountOfTickets: number;
	priceOfTicket: number;
	expectedDrawDate: Date;
	active: boolean;
	image: string;
	numbers: number[];
}