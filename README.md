# uec cm

The Capacity Management System (CMS) is a single, trustworthy, accurate, official source of the data relating to service/unit capacity across the whole of the NHS in England.

Which then provides this positive change:

Improving the way that the data can be viewed and analysed/disseminated, so that decisions can be made with the knowledge of the current and future status of the capacity of the business

This repo contains the following:

- `docs/adr` Contains the ADR 'decisions'
- `infrastructure/` Contains infrastructure related Terraform templates for deploying the app, including the installation steps.
- `scripts/` Various scripts including githooks, functions etc.
- `src/frontend` Contains the React app including installation steps.
- `tests/` Contains tests related to the app

## Table of Contents

- [uec cm](#uec-cm)
  - [Installation && Prerequisites](#installation-and-prerequisites)
  - [Architecture](#architecture)
    - [Diagrams](#diagrams)
    - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [Contacts](#contacts)
  - [Licence](#licence)

### Installation and Prerequisites

- Setup git locally on your machine and configure the git user email and name.
- Setup gpg commit signing, which is required for commits to be 'verified'. Guidance on confluence
- Run the pre-commit hooks located in the 'scripts' folder
- Install an appropriate IDE compatible with Typescript, Terraform and python.
- Clone the repository

Specific installation for the separate sections are divided in the locations

- `infrastructure/README.md`
- `src/frontend/README.md`

## Architecture

### Diagrams

The [C4 model](https://c4model.com/) is a simple and intuitive way to create software architecture diagrams that are clear, consistent, scalable and most importantly collaborative. This should result in documenting all the system interfaces, external dependencies and integration points.

### Configuration

Most of the projects are built with customisability and extendability in mind. At a minimum, this can be achieved by implementing service level configuration options and settings. The intention of this section is to show how this can be used. If the system processes data, you could mention here for example how the input is prepared for testing - anonymised, synthetic or live data.

## Contributing

To ensure consistency and turn on the required githooks contributors must run the following script from the project root see below

/bin/bash scripts/git/git-config-set-up.sh

Describe or link templates on how to raise an issue, feature request or make a contribution to the codebase. Reference the other documentation files, like

- Environment setup for contribution, i.e. `CONTRIBUTING.md`
- Coding standards, branching, linting, practices for development and testing
- Release process, versioning, changelog
- Backlog, board, roadmap, ways of working
- High-level requirements, guiding principles, decision records, etc.

## Contacts

Provide a way to contact the owners of this project. It can be a team, an individual or information on the means of getting in touch via active communication channels, e.g. opening a GitHub discussion, raising an issue, etc.

## Licence

> The [LICENCE.md](./LICENCE.md) file will need to be updated with the correct year and owner

Unless stated otherwise, the codebase is released under the MIT License. This covers both the codebase and any sample code in the documentation.

Any HTML or Markdown documentation is [© Crown Copyright](https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/) and available under the terms of the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).
