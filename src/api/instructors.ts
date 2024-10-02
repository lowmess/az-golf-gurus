import { request } from "#api/request";

export type Instructor = {
	image?: {
		url: string;
		width: number;
		height: number;
	};
	name: string;
	bio?: string;
	url?: string;
};

type InstructorsSection = {
	title: string;
	url?: string;
	instructors: Array<Instructor>;
};

const getInstructorsSectionQuery = `
query getInstructorsSection {
	instructorsSection {
		title
		url
		instructors {
			image {
				url
				width
				height
			}
			name
			bio
			url
		}
	}
}
`;

export async function getInstructorsSection(): Promise<InstructorsSection> {
	const data = await request(getInstructorsSectionQuery);

	return data.instructorsSection;
}
