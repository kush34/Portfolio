"use client";

import { company } from "@/types";
import { GoArrowUpRight } from "react-icons/go";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ExperienceCardProps = company & {
  theme: "light" | "dark";
};

// one compact, scannable row per experience
const ExperienceCard = ({
  name,
  position,
  time,
  link,
  imageLink,
  altImage,
  img_bg,
  techs,
}: ExperienceCardProps) => {
  const idPrefix = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <Card className="border-none shadow-none bg-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary"
        >
          <img
            src={imageLink}
            alt={altImage}
            className={`h-full w-full rounded-lg object-contain p-1.5 ${img_bg ?? ""
              }`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base xl:text-lg font-semibold leading-snug">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground leading-snug">
            {position}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-sm text-muted-foreground">
            {time}
          </span>

          {techs && (
            <TooltipProvider>
              <div className="flex items-center gap-2 text-muted-foreground">
                {techs.map(({ icon: Icon, label }, idx) => (
                  <Tooltip key={idx}>
                    <TooltipTrigger
                      id={`${idPrefix}-tech-${idx}`}
                      render={<Icon size={16} className="shrink-0" />}
                    />
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          )}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${name}`}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <GoArrowUpRight size={18} />
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
