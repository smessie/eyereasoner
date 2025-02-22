import type { SWIPLModule } from 'swipl-wasm/dist/swipl/swipl';

/**
 * Executes a query
 * @param Module The module to execute the query on
 * @param name The name of the query function
 * @param args The arguments of the query function
 * @returns The result of the query
 */
export function query(Module: SWIPLModule, name: string, args: string[] | string) {
  const queryString = `${name}(${
    typeof args === 'string'
      ? `"${args}"`
      : `[${args.map((arg) => `'${arg}'`).join(', ')}]`
  }).`;
  return Module.prolog.query(queryString);
}

export function queryOnce(Module: SWIPLModule, name: string, args: string[] | string) {
  return query(Module, name, args).once();
}
