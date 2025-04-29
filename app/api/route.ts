import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/actions/search";

/**
 * GET route handler for search functionality
 * @param request - The incoming request object
 * @returns A JSON response with search results or error information
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the query parameter from the URL
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    // Validate query parameter
    if (!query) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    // Perform search
    const results = await search(query);

    // Return successful response
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
