/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly DATOCMS_READ_ONLY_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
