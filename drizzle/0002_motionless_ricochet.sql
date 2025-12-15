CREATE TABLE "arena" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"maxCapacity" integer NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "primaryArenaId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "game" ADD COLUMN "attendance" integer;--> statement-breakpoint
ALTER TABLE "game" ADD COLUMN "arenaId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_primaryArenaId_arena_id_fk" FOREIGN KEY ("primaryArenaId") REFERENCES "public"."arena"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_arenaId_arena_id_fk" FOREIGN KEY ("arenaId") REFERENCES "public"."arena"("id") ON DELETE restrict ON UPDATE cascade;