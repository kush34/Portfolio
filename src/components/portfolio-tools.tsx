"use client";

import { useWebMCP } from "use-webmcp-tool";
import {
  projects,
  companies,
  blogs,
  reviews,
  techList,
} from "@/constants/data"; // change path to your data file

type SearchProjectsInput = {
  query: string;
};

export default function PortfolioTools() {
  useWebMCP({
    name: "get_projects",
    description: "Get all software projects in Kush's portfolio.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    async execute() {
      return JSON.stringify(
        projects.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          technologies: p.techstack,
          github: p.gitlink,
          live: p.liveLink,
          npm: p.npmPackage,
        })),
      );
    },
  });

  useWebMCP({
    name: "search_projects",
    description: "Search Kush's portfolio projects by technology or keyword.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Technology or keyword to search for.",
        },
      },
      required: ["query"],
    },
    async execute(input: SearchProjectsInput) {
      const query = input.query.toLowerCase();

      const results = projects.filter((p) =>
        [p.title, p.description, ...p.techstack]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );

      return JSON.stringify(
        results.map((p) => ({
          title: p.title,
          description: p.description,
          technologies: p.techstack,
          github: p.gitlink,
          live: p.liveLink,
        })),
      );
    },
  });

  useWebMCP({
    name: "get_experience",
    description: "Get Kush's professional work experience.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    async execute() {
      return JSON.stringify(
        companies.map((c) => ({
          company: c.name,
          position: c.position,
          period: c.time,
          responsibilities: c.points,
          technologies: c.techs?.map((t) => t.label) ?? [],
          website: c.link,
        })),
      );
    },
  });

  useWebMCP({
    name: "get_tech_stack",
    description: "Get technologies and tools used by Kush.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    async execute() {
      return JSON.stringify(techList.map((t) => t.name));
    },
  });

  useWebMCP({
    name: "get_blogs",
    description: "Get technical and personal blog posts from Kush's portfolio.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    async execute() {
      return JSON.stringify(
        blogs.map((b) => ({
          title: b.title,
          summary: b.content,
          date: b.time,
          url: b.link,
        })),
      );
    },
  });

  useWebMCP({
    name: "get_reviews",
    description: "Get testimonials and reviews about Kush.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    async execute() {
      return JSON.stringify(reviews);
    },
  });

  return null;
}
