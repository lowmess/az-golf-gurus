import { request } from "#api/request";

type Instructor = {
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
	instructors: Array<Instructor>;
};

const getInstructorsSectionQuery = `
query getInstructorsSection {
	instructorsSection {
		title
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
