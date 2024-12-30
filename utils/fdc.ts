import { DOMAINS } from "@/constants/endpoint";

export const getFoodCategory = (foodItem: string) => {
  return fetch(`${DOMAINS.FDC}/portal-data/external/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      generalSearchInput: foodItem,
      includeDataTypes: {
        Foundation: true,
      },
      referenceFoodsCheckBox: true,
      requireAllWords: false,
      sortCriteria: {
        sortColumn: "description",
        sortDirection: "asc",
      },
    }),
  })
    .then((fetchResponse) => fetchResponse.json())
    .then((response) => {
      /**
       * Using foods[0] since the first item in the array has the highest confidence score
       */
      const foodCategory = response.foods[0]?.foodCategory || "Other";
      return {
        [foodItem]: foodCategory,
      };
    });
};
