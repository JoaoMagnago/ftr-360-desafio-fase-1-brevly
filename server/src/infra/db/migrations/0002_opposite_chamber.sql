ALTER TABLE "short-links" ADD COLUMN "remote_key" text;--> statement-breakpoint
ALTER TABLE "short-links" ADD COLUMN "remote_url" text;--> statement-breakpoint
ALTER TABLE "short-links" ADD CONSTRAINT "short-links_remote_key_unique" UNIQUE("remote_key");