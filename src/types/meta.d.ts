export {};

declare global {
	interface EntityMetadata {
		id: string;
		created_at: string;
		updated_at: string;
	}
}
