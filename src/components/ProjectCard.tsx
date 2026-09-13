"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { project } from "@/types";

import NpmBadge from "@/components/NpmBadge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { FaGithub } from "react-icons/fa6";

const MotionCard = motion(Card);

const ProjectCard = (project: project) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group overflow-hidden transition-shadow hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.altImage}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.npmPackage && <NpmBadge name={project.npmPackage} />}
      </div>
      <CardHeader className="p-0"></CardHeader>

      <CardContent className="space-y-3">
        <h3 className="text-xl font-semibold">{project.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
      </CardContent>

      {(project.liveLink || project.gitlink) && (
        <CardFooter
          className={`flex ${project.liveLink && project.gitlink
              ? "justify-between"
              : "justify-end"
            }`}
        >
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex size-9 items-center justify-center rounded-md border text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          {project.gitlink && (
            <a
              href={project.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex size-9 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <FaGithub className="h-4 w-4" />
            </a>
          )}
        </CardFooter>
      )}    </MotionCard>
  );
};

export default ProjectCard;
