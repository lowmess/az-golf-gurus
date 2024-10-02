import { request } from "#api/request";

type CalendarButton = {
	label: string;
	url: string;
};

export type Instructor = {
	image?: {
		url: string;
		width: number;
		height: number;
	};
	name: string;
	bio?: string;
	calendarButton?: CalendarButton;
};

type InstructorsSection = {
	title: string;
	newStudentCalendarButton?: CalendarButton;
	instructors: Array<Instructor>;
};

const getInstructorsSectionQuery = `
query getInstructorsSection {
	instructorsSection {
		title
		newStudentCalendarButton {
			label
			url
		}
		instructors {
			image {
				url
				width
				height
			}
			name
			bio
			calendarButton {
				label
				url
			}
		}
	}
}
`;

export async function getInstructorsSection(): Promise<InstructorsSection> {
	const data = await request(getInstructorsSectionQuery);

	return data.instructorsSection;
}
