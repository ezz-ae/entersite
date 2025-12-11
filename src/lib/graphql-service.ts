
const API_URL = "https://data2.realiste.io/graphql";

// This query is a simplified version based on the schema inspection
// In a real scenario, you'd build this programmatically or use a tool like Apollo/Urql
export const GET_PROJECTS_QUERY = `
  query GetProjects($filter: BuildingInfo__FilterInput) {
    buildingInfos(first: 50, filter: $filter) {
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
        });

        if (!response.ok) {
            throw new Error(`GraphQL request failed with status ${response.status}`);
        }

        const json = await response.json();
        
        if (json.errors) {
            console.error("GraphQL Errors:", json.errors);
            throw new Error("Error fetching data from Realiste API.");
        }
        
        return json.data.buildingInfos.nodes;

    } catch (error) {
        console.error("Failed to fetch Realiste projects:", error);
        return [];
    }
}
