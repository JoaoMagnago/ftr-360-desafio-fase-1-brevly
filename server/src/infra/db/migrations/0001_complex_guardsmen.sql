ALTER TABLE "short-links" RENAME COLUMN "short_key" TO "short_url";--> statement-breakpoint
ALTER TABLE "short-links" DROP CONSTRAINT "short-links_short_key_unique";--> statement-breakpoint
ALTER TABLE "short-links" ADD CONSTRAINT "short-links_short_url_unique" UNIQUE("short_url");