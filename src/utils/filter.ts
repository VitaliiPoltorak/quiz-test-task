import {Option} from "../types.ts";

export const filterOptionsByDependencies = ( options: Option[], dependencies: Record<string, boolean> ) => {
  return options.filter(option => {
    if ( !option.dependencies ) return true;
    return option.dependencies.some(dep => dependencies[dep]);
  });
};
