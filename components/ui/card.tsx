"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> };
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> };
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> };

function Card({ className, ref, ...props }: DivProps) {
  return <div ref={ref} className={cn("rounded-lg border border-brand-border bg-white text-brand-text shadow-sm", className)} {...props} />;
}

function CardHeader({ className, ref, ...props }: DivProps) {
  return <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

function CardTitle({ className, ref, ...props }: HeadingProps) {
  return <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

function CardDescription({ className, ref, ...props }: ParagraphProps) {
  return <p ref={ref} className={cn("text-sm text-brand-muted", className)} {...props} />;
}

function CardContent({ className, ref, ...props }: DivProps) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ref, ...props }: DivProps) {
  return <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
