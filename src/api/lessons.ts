import { request } from "#api/request";

type Lesson = {
	title: string;
	subtitle: string;
	price: number;
	calendlyUrl: string;
};

const getAllLessonsQuery = `
query getAllLessions {
  allLessons {
    title
    subtitle
    price
    calendlyUrl
  }
}
`;

export async function getAllLessons(): Promise<Array<Lesson>> {
	const data = await request(getAllLessonsQuery);

	return data.allLessons;
}
