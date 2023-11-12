import { request } from "#api/request";

type Homepage = {
	title: string;
	description: string;
	image: {
		url: string;
		width: number;
		height: number;
	};
};

const getHomepageQuery = `
query getHomepage {
  homepage {
    title
    description
    image {
      url
      width
      height
    }
  }
}
`;

export async function getHomepage(): Promise<Homepage> {
	const data = await request(getHomepageQuery);

	return data.homepage;
}
