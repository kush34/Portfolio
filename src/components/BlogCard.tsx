"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { blog } from "@/types";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const MotionCard = motion(Card);

const BlogCard = ({ title, content, time, slug }: blog) => {
  const navigate = useRouter();

  return (
    <MotionCard
      onClick={() => navigate.push(`${slug}`)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      className="group cursor-pointer transition-shadow hover:shadow-xl"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>

          <p className="text-sm text-muted-foreground">{time}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            navigate.push(`${slug}`);
          }}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-muted-foreground">{content}</p>
      </CardContent>
    </MotionCard>
  );
};

export default BlogCard;
