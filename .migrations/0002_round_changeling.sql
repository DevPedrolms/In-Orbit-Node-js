CREATE TABLE IF NOT EXISTS "Users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"avatar_url" text NOT NULL,
	"external_account_id" integer NOT NULL,
	CONSTRAINT "Users_external_account_id_unique" UNIQUE("external_account_id")
);
