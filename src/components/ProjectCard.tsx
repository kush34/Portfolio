"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { project } from "@/types";

import DownloadsBadge from "@/components/DownloadsBadge";

import { Card, CardContent } from "@/components/ui/card";

import { FaGithub } from "react-icons/fa6";

const MotionCard = motion.create(Card);

const ProjectCard = (project: project) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group overflow-hidden pt-0 transition-all duration-300 hover:shadow-xl hover:border-ring/50"
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.altImage}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {project.npmPackage && <DownloadsBadge name={project.npmPackage} />}
        {project.vsCodeExtension && (
          <DownloadsBadge name={project.vsCodeExtension} source="vscode" />
        )}

        {(project.liveLink || project.gitlink) && (
          <div className="absolute bottom-3 right-3 z-10 flex gap-2">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title}`}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
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
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>

      <CardContent className="space-y-3">
        <h3 className="text-xl font-semibold">{project.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
      </CardContent>
    </MotionCard>
  );
};

export default ProjectCard;