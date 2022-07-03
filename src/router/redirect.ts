import { LocationQueryRaw, RouteParamsRaw } from "vue-router";
import router from ".";

export const handleRedirect = (
  routeName: string,
  query?: LocationQueryRaw,
  params?: RouteParamsRaw
) => {
  router.push({name: routeName, query: query, params: params})
}