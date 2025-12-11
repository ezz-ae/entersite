
const API_URL = "https://data2.realiste.io/graphql";

// This query is now corrected to align with the provided schema.
// It fetches buildingInfos (projects) for a specific agglomeration (city).
export const GET_PROJECTS_QUERY = `
  query GetProjectsInAgglomeration($agglomerationUrlPath: String!, $filter: BuildingInfo__FilterInput__Common) {
    agglomeration(urlPathSegment: $agglomerationUrlPath) {
      buildingInfos(first: 100, filter: $filter) {
        nodes {
          id
          name
          urlPathSegment
          publicUrl
          handover {
            quarter
            year
          }
          tags {
            code
            name
          }
          developer {
            name
          }
          agglomeration {
            name
          }
          agglomerationArea {
            name
          }
          stats {
            priceRange {
              min { value currency }
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
`;

export async function fetchRealisteProjects(city: string, filter: any) {
    try {
        const agglomerationUrlPath = `uae-${city.toLowerCase()}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: GET_PROJECTS_QUERY,
                variables: { 
                    agglomerationUrlPath,
                    filter 
                },
            }),
            cache: 'no-store'
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
        
        return json.data.agglomeration?.buildingInfos?.nodes || [];

    } catch (error) {
        console.error("Failed to fetch Realiste projects:", error);
        return [];
    }
}
