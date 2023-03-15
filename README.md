# Proof of Concept: Gatsby Dual Builder Stack

This repo demonstrates a specific way to use Gatsby to add a rich local editing experience to simple file-based websites.

https://user-images.githubusercontent.com/9111807/224888021-1c6ea8b6-6a49-4f8e-98e9-9dd58bd15ecb.mp4

Edits are done in a local environment with the `editor` app, and then the same data is fed into the `website` app to generate a static website, sharing as many resources as possible but eschewing the editor bits that the public doesn't need.
Shared resources are stored in a `core` app, which should be utilized as much as possible to keep the two environments as close as possible.

# What is it?

The project in this case is a hyper-minimal microblog (think Twitter) that allows users to make posts that have a title and text. Only the absolute bare minimum of styling is in place because this repo is focused on the dual-builder stack itself.

# How to use

Most of the interactions with this project should be through npm scripts on the root package, which are directed toward the relevant subpackage.

- `npm run editor`/`npm run develop`: Run the editor server at http://localhost:8000 (or specify a host with `-H`)

- `npm run build`: Build the non-editor version of the site into `website/public`

- `npm run serve`: Serve the non-editor version of the site at http://localhost:9000

Most of the other scripts you would expect out of a Gatsby project are here as well, but the prior three are the core ones intended to be used.

# Hacks

This project depends on some hacks to make the project work either in whole or in part.

- `trailingSlash` is set to `never` because of a bug where pages can't be re-created after being deleted. (fixed in [a PR](https://github.com/gatsbyjs/gatsby/pull/37745))
- The `gatsby-config` and `gatsby-node` from `core` are imported relatively and re-exported instead of using a Gatsby Theme. This is due to a limitation where Gatsby themes in monorepos can't use Typescript, as well as the fact we don't need all the features of Gatsby Themes here as all the subrepos are tightly coupled as a given.
