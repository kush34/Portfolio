import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import { project } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa6";

const MotionCard = motion(Card);

const ProjectCard = (project: project) => {
  const navigate = useNavigate();

  return (
    <MotionCard
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/projectPage/${project.id}`)}
      className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-xl"
    >
        <img
          src={project.image}
          alt={project.altImage}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      <CardHeader className="p-0">
      </CardHeader>

      <CardContent className="space-y-3">
        <h3 className="text-xl font-semibold">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between">
        {project.liveLink ? (
          <Button
            asChild
            variant="outline"
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <div />
        )}

        {project.gitlink && (
          <Button
            asChild
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={project.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <FaGithub className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </MotionCard>
  );
};

export default ProjectCard;