import { NextResponse } from "next/server";
import { allProjects } from "@/lib/projects";

export async function GET() {
    return NextResponse.json(allProjects);
}
