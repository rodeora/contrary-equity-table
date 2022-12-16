import { useQuery } from "@tanstack/react-query";
import { Investment } from "../../types";

async function getInvestments() : Promise<Investment[]> {
  return fetch('api/investments').then((res) => res.json());
}
export const useInvestments = () => {
  return useQuery(['investments'], () => getInvestments())
}
