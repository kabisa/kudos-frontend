# Technical debt

This document describes outstanding technical debt and how it could be addressed.

## Setup graphql codegen and schema

Setting up graphql codegen will make it easier to work with graphql queries and mutations.

## Extract graphql queries from components

Move graphql queries from components to separate files. This will make it easier to work with graphql codegen and queries can be re-used. 

## Replace class components with functional components

In a lot of places class components are still being used. Replace these with functional components and use hooks for extracting logic. Also, in some of these class components, the state of child components is managed by the children themselves. This should be moved to the parent component, or to a context.

## Replace Enzyme tests with React Testing Library

Enzyme is no longer maintained. Replace Enzyme tests with React Testing Library. 

## Upgrade to React 18 after removing Enzyme

Upgrade the project to React 18 once enzyme is removed. 

## Implement UI components from ui folder

Currently UI components from @kabisa/ui-components are used. Replace these with the wrapper UI components from de ui folder. There might be functionality missing from these wrapper components. Implement this functionality.