import { request } from "#api/request";

type CalendarButton = {
	label: string;
	url: string;
};

type BookingSection = {
	title: string;
	subtitle?: string;
	calendarButtons: Array<CalendarButton>;
};

const getBookingSectionQuery = `
query getBookingSection {
  bookingSection {
		title
    subtitle
		calendarButtons {
			label
			url
		}
  }
}
`;

export async function getBookingSection(): Promise<BookingSection> {
	const data = await request(getBookingSectionQuery);

	return data.bookingSection;
}
