"use client";

import { company } from "@/types";
import { GoArrowUpRight } from "react-icons/go";
import { TbPointFilled } from "react-icons/tb";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ExperienceCardProps = company & {
  theme: "light" | "dark";
};

const ExperienceCard = ({
  name,
  position,
  time,
  points,
  link,
  imageLink,
  altImage,
  img_bg,
  theme,
  techs,
}: ExperienceCardProps) => {
  const idPrefix = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="space-y-6 p-5">
        <div className="flex justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl ${
                theme === "light" ? "bg-neutral-100" : "bg-zinc-900"
              }`}
            >
              <img
                src={imageLink}
                alt={altImage}
                className={`h-full w-full rounded-xl object-contain p-3 ${
                  theme === "dark" ? img_bg : ""
                }`}
              />
            </div>

            <div>
              <h3 className="text-lg xl:text-xl font-semibold">
                {name}
              </h3>
              <p className="text-sm xl:text-lg text-muted-foreground">
                {position}
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-3">
            {techs && (
              <TooltipProvider>
                <div className="flex flex-wrap justify-end gap-2">
                  {techs.map(({ icon: Icon, label }, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger
                        id={`${idPrefix}-tech-${idx}`}
                        render={
                          <Badge
                            variant="secondary"
                            className="h-9 w-9 p-0 rounded-full flex items-center justify-center"
                          >
                            <Icon size={18} />
                          </Badge>
                        }
                      />

                      <TooltipContent>
                        {label}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            )}

            <div className="flex items-center gap-3">
              {link && (
                <Button
                  size="icon"
                  variant="ghost"
                  nativeButton={false}
                  render={
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${name}`}
                    >
                      <GoArrowUpRight size={18} />
                    </a>
                  }
                />
              )}

              <span className="text-sm text-muted-foreground">
                {time}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 max-w-3xl">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <TbPointFilled className="mt-1 shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
