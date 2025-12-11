
const API_URL = "https://data2.realiste.io/graphql";

// This query is now corrected to align with the provided schema.
// It fetches agglomerations and then the buildingInfos (projects) within them.
export const GET_PROJECTS_QUERY = `
  query GetProjects($filter: BuildingInfo__FilterInput__Common) {
    agglomerationsP(filter: { buildingInfoFilter: $filter }) {
      nodes {
        buildingInfos(first: 50) {
          nodes {
            id
            name
            urlPathSegment
            publicUrl
            developer {
              name
            }
            agglomeration {
              name
              country {
                code
              }
            }
            agglomerationArea {
              name
            }
            handover {
              quarter
              year
            }
            tags {
              code
              name
            }
            stats {
              priceRange {
                min {
                  value
                  currency
                }
              }
              areaRange {
                min { value unit }
                max { value unit }
              }
              bedrooms {
                count
              }
            }
            marketing {
              mainImageUrl
            }
            unitsStockUpdatedAt
          }
        }
      }
    }
  }
`;

export async function fetchRealisteProjects(filter: any) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: GET_PROJECTS_QUERY,
                variables: { filter },
            }),
            cache: 'no-store' // Disable caching to ensure fresh data
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("GraphQL request failed:", response.status, errorBody);
            throw new Error(`GraphQL request failed with status ${response.status}`);
        }

        const json = await response.json();
        
        if (json.errors) {
            console.error("GraphQL Errors:", json.errors);
            throw new Error("Error fetching data from Realiste API.");
        }
        
        // The data is nested within agglomerations, so we need to flatten it.
        const projects = json.data.agglomerationsP.nodes.flatMap(
            (agg: any) => agg.buildingInfos.nodes
        );

        return projects;

    } catch (error) {
        console.error("Failed to fetch Realiste projects:", error);
        return [];
    }
}
