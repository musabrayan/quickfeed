import React from "react"
import { SparklesIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const BadgeButton = () => {
  return (
    <Badge
      variant="outline"
      className="mb-3 text-md py-2 px-6 cursor-pointer rounded-full border border-black/10 bg-card text-card-foreground md:left-6"
    >
      <SparklesIcon className=" mr-2  fill-primary stroke-1 text-white" />{" "}
      Get Real Feedback
    </Badge>
  )
}

export default BadgeButton
