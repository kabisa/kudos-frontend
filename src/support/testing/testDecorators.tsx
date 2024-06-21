import { Decorator } from "./testComponent";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Route } from "react-router-dom";
import { ApolloCache } from "@apollo/client/cache";
import { Context as ResponsiveContext } from "react-responsive";

export const responsiveDecorator: Decorator<"responsive", { width: number }> = {
  name: "responsive",
  settings: { width: 1200 },
  Decorator: ({ Component, settings }) => (
    <ResponsiveContext.Provider value={{ width: settings.width }}>
      <Component />
    </ResponsiveContext.Provider>
  ),
};

export const dataDecorator = <TSerialized extends object>(
  mocks?: any,
  cache?: ApolloCache<TSerialized>,
): Decorator<
  "application",
  { useTypeName: boolean; mocks?: any; cache?: ApolloCache<TSerialized> }
> => ({
  name: "application",
  settings: { useTypeName: true, mocks, cache },
  Decorator: ({ Component, settings }) => (
    <MockedProvider
      mocks={settings.mocks}
      addTypename={settings.useTypeName}
      cache={settings.cache}
    >
      <Component />
    </MockedProvider>
  ),
});

export const routingDecorator = (): Decorator<
  "routing",
  { paths: Record<string, React.ReactNode> }
> => ({
  name: "routing",
  settings: {
    paths: {},
  },
  Decorator: ({ Component, settings }) => (
    <MemoryRouter>
      <Component />
      {Object.entries(settings.paths).map(([path, content]) => (
        <Route path={path} key={path}>
          {content}
        </Route>
      ))}
    </MemoryRouter>
  ),
});

export const tableDecorator: Decorator<"table", Record<string, unknown>> = {
  name: "table",
  settings: {},
  Decorator: ({ Component }) => (
    <table>
      <tbody>
        <Component />
      </tbody>
    </table>
  ),
};
