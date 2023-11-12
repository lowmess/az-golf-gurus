import { request } from "#api/request";

type Site = {
	faviconMetaTags: Array<{
		tag: string;
		attributes: Record<string, string>;
	}>;
	globalSeo: {
		siteName: string;
		fallbackSeo: {
			title: string;
			description: string;
		};
	};
};

const getSiteQuery = `
query getSite {
  _site {
    faviconMetaTags {
      tag
      attributes
    }
    globalSeo {
      siteName
      fallbackSeo {
        title
        description
      }
    }
  }
}
`;

export async function getSite(): Promise<Site> {
	const data = await request(getSiteQuery);

	return data._site;
}
