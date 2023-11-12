import { request } from "#api/request";

type ContactForm = {
	title: string;
	w3formsAccessKey: string;
	introText?: string;
	successText?: string;
};

const getContactFormQuery = `
query getContactForm {
  contactForm {
		title
    w3formsAccessKey
		introText
		successText
  }
}
`;

export async function getContactForm(): Promise<ContactForm> {
	const data = await request(getContactFormQuery);

	return data.contactForm;
}
