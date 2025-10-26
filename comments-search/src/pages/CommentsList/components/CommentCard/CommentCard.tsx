import { Card } from "@/components";
import type { Comment } from "@/types";
import { MessageSquare, User, Mail } from "lucide-react";

export default function CommentCard({ comment }: { comment: Comment }) {
  const truncatedBody =
    comment.body.length > 64
      ? comment.body.substring(0, 64) + "..."
      : comment.body;

  return (
    <Card className="group overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/10 to-accent/10 ring-1 ring-primary/20 transition-all group-hover:from-primary/20 group-hover:to-accent/20 group-hover:ring-primary/30">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 space-y-3">
            {/* Name */}
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 shrink-0 text-muted-foreground" />
              <h3 className="text-balance font-semibold leading-tight text-foreground">
                {comment.name}
              </h3>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="truncate text-sm text-muted-foreground">
                {comment.email}
              </p>
            </div>

            {/* Body */}
            <p className="text-pretty leading-relaxed text-foreground/90">
              {truncatedBody}
            </p>

            {/* Post ID Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Post #{comment.postId}
              </span>
              <span className="text-xs text-muted-foreground">
                Comment #{comment.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
