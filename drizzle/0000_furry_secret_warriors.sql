CREATE TABLE "team" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"location" text,
	"name" text,
	"shortName" text
);
--> statement-breakpoint
CREATE TABLE "game" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"gameDate" timestamp with time zone NOT NULL,
	"season" text NOT NULL,
	"gameType" text NOT NULL,
	"homeTeamScore" integer,
	"awayTeamScore" integer,
	"gameLength" integer,
	"messageCount" integer,
	"isTakeoverTour" boolean,
	"homeTeamId" integer NOT NULL,
	"awayTeamId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_homeTeamId_team_id_fk" FOREIGN KEY ("homeTeamId") REFERENCES "public"."team"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_awayTeamId_team_id_fk" FOREIGN KEY ("awayTeamId") REFERENCES "public"."team"("id") ON DELETE restrict ON UPDATE cascade;