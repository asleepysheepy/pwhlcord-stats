import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes'

export default [
  index('routes/home/home.tsx'),
  ...prefix('resources', [route('team-logo/:imageId', 'routes/resources/team-logo.tsx')]),
] satisfies RouteConfig
