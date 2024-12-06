import kebabCase from "lodash.kebabcase"
import { leadingSlash, trailingSlash } from "./function"
import { PAGES } from "../constant/page"

export function abort(code = 404) {
  return {
    name: "FourOfFour",
    path: "*",
    component: () => error(code),
  }
}

export function error() {
  return import("@/views/ErrorView.vue")
}

export function layout(layout = "Default", children, path = "") {
  const dir = kebabCase(layout)
  return {
    children,
    component: () => import(`../layouts/${dir}/Index`),
    path,
  }
}

export function redirect(path = "*", rhandler) {
  if (typeof path === "function") {
    rhandler = path
    path = "*"
  }

  return {
    path,
    redirect: (to) => {
      const rpath = rhandler(to)
      const url = rpath !== "" ? leadingSlash(trailingSlash(rpath)) : rpath

      return `/${url}`
    },
  }
}

export function route(routeName, componentName, component, path = "") {
  component =
    Object(component) === component
      ? component
      : { default: componentName.replace(" ", "") }
  const components = {}

  for (const [key, value] of Object.entries(component)) {
    components[key] = () => import(`@/views/${value}`)
  }

  return {
    name: routeName,
    components,
    path,
  }
}

export function autoRoute() {
  const pages = Object.values(PAGES).reduce((acc, ele) => {
    const routeName = ele.name
    const file = ele.file
    const routePath = ele.path
    acc.push(route(routeName, file, null, routePath))
    return acc
  }, [])
  pages.push(abort())

  return layout('Default', pages)
}
