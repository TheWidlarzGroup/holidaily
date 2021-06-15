# holidaily

# FAQ

1) Don't type things as `any`
2) Don't use default exports
3) We prefer `type` over `interface`
4) For styling please use <b>restyle</b>
5) Please add <b>unit tests</b> for functions you wrote
6) Use naming convention `feature/my-awesome-feature` and `bugfix/some-bug` for <b>branches</b>
7) Don't use hardcoded strings, use <b>i18n</b>
8) Use <b>meaningful names</b> for variables and components 
9) Try to write <b>reusable</b> code


Please Don't use [FC](https://fettblog.eu/typescript-react-why-i-dont-use-react-fc) to type React Components without children.
<br/>
instead do sth like this 
```tsx
type ComponentProps = {
  label: string
}

export const Component = (props: ComponentProps) => {
 //...
}


```


# Links 
[FIGMA](https://www.figma.com/file/LrAhsnwm7ZdUQPnKfjxfjz/Holidaily?node-id=0%3A1)



# BACKEND

Backend is temporarily hosted at

```
https://holidaily.danielgrychtol.com
```

To make GraphQL request hit:

```
https://holidaily.danielgrychtol.com/api/graphql
```

Playground is available at:

```
https://holidaily.danielgrychtol.com/api/graphiql
```
